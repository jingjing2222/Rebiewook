import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SearchedBooks from "@/components/SearchedBooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

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

    const {
        data,
        isLoading,
        isError,
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
        getNextPageParam: (l, allPages, lastPageParam) => {
            const isEnd = allPages[lastPageParam - 1].meta.is_end;
            if (isEnd) return null;
            return allPages.length + 1;
        },
        enabled: enabled,
        staleTime: 1000 * 5,
    });

    const PrintSearchedBooks = () => {
        if (enabled) {
            if (isLoading) return <li>Loading</li>;
            if (isError) return <div>{`${isError}`}</div>;
            if (data)
                if (data.pages.length > 0) {
                    return (
                        <React.Fragment>
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {data.pages.map((book) =>
                                    book.documents.map(
                                        (
                                            bookInfo: SearchedBook,
                                            index: number
                                        ) => (
                                            <SearchedBooks
                                                book={bookInfo}
                                                onClick={onClick}
                                                key={index}
                                            />
                                        )
                                    )
                                )}
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={
                                        !hasNextPage || isFetchingNextPage
                                    }
                                >
                                    {isFetchingNextPage
                                        ? "Loading more..."
                                        : hasNextPage
                                          ? "Load More"
                                          : "Nothing more to load"}
                                </button>
                            </ul>
                        </React.Fragment>
                    );
                } else return <div>검색 결과가 없습니다.</div>;
        } else return <div>검색해주세요</div>;
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
                        if (e.key === "Enter") {
                            if (!enabled) setEnabled(true);
                            else refetch();
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        if (!enabled) setEnabled(true);
                        else refetch();
                    }}
                >
                    Search
                </Button>
            </div>
            <PrintSearchedBooks />
        </div>
    );
};
