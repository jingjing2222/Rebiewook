import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import SearchedBooks from "@/components/UploadForm/SearchedBooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
}

const fetchBooks = async (book: string, pageParam: number) => {
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${book}&page=${pageParam}&size=50`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};

export const BookSearch = ({
    onClick,
}: {
    onClick: (book: SearchedBook) => void;
}) => {
    const inputTitle = useRef("");
    const [enabled, setEnabled] = useState(false);
    console.log("book search: re-rendered");

    const {
        status,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["searchBook", inputTitle.current],
        queryFn: ({ pageParam }) => {
            return fetchBooks(inputTitle.current, pageParam);
        },
        initialPageParam: 1,
        //파라미터를 잘 보자, 필요한거 다 있떠라, 바보 멍청아
        getNextPageParam: (lastPage, allPages) => {
            // lastPage가 직전 페이징의 결과(=마지막으로 fetch된 데이터)
            // allPages가 지금까지 fetch된 모든 데이터를 배열로 담고 있음
            const isEnd = lastPage.meta.is_end;
            if (isEnd) return null;
            return allPages.length + 1;
        },
        enabled: enabled,
        staleTime: 1000 * 5,
    });
    const allRows = data ? data.pages.flatMap((d) => d.documents) : [];
    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: 51,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 128,
    });

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

        if (!lastItem) {
            return;
        }

        if (
            lastItem.index >= allRows.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [
        hasNextPage,
        fetchNextPage,
        allRows.length,
        isFetchingNextPage,
        rowVirtualizer,
    ]);

    const fetch = () => {
        if (!enabled) setEnabled(true);
        else refetch();
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Input
                    placeholder="Enter book title"
                    className="flex-grow"
                    onChange={(e) => {
                        inputTitle.current = e.currentTarget.value;
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") fetch();
                    }}
                />
                <Button onClick={fetch}>Search</Button>
            </div>
            <div
                ref={parentRef}
                style={{
                    height: `200px`,
                    width: `100%`,
                    overflow: "auto",
                }}
            >
                {status === "pending" ? (
                    <li>Loading</li>
                ) : status === "error" ? (
                    <div>{`error`}</div>
                ) : (
                    <ul
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                            <SearchedBooks
                                key={virtualRow.index}
                                book={allRows[virtualRow.index]}
                                onClick={onClick}
                                virtual={virtualRow}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
