import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SearchedBooks from "@/components/SearchedBooks";
import { useInfiniteQuery } from "@tanstack/react-query";

interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
}

const fetchBooks = async (book: string, pageParam: number) => {
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${book}&page=${pageParam}`;

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

    const { data, isLoading, isError, refetch, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["searchBook", inputTitle.current],
            queryFn: ({ pageParam }) => {
                return fetchBooks(inputTitle.current, pageParam);
            },
            initialPageParam: 1,
            getNextPageParam: (lastPageParam) => lastPageParam.length + 1,
            getPreviousPageParam: (lastPageParams) => lastPageParams.length - 1,
            enabled: enabled,
            staleTime: 1000 * 5,
        });

    const PrintSearchedBooks = () => {
        if (enabled) {
            if (isLoading) return <li>Loading</li>;
            if (isError) return <div>{`${isError} 이건가?`}</div>;
            if (data)
                if (data.pages.length > 0) {
                    return (
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {data.pages.map((book) =>
                                book.documents.map(
                                    (bookInfo: SearchedBook, index: number) => (
                                        <SearchedBooks
                                            book={bookInfo}
                                            onClick={onClick}
                                            key={index}
                                        />
                                    )
                                )
                            )}
                            <button onClick={() => fetchNextPage()}>
                                다음 페이지
                            </button>
                        </ul>
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
