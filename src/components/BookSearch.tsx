import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SearchedBooks from "@/components/SearchedBooks";
import { useQuery } from "@tanstack/react-query";

interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
}

const fetchBooks = async (book: string) => {
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${book}`;

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

    const { data, refetch } = useQuery({
        queryKey: ["searchBook", inputTitle.current],
        queryFn: () => fetchBooks(inputTitle.current),
        select: (data) => data.documents,
        enabled: enabled,
        staleTime: 1000 * 1,
    });

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
            {data ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {data.length > 0 ? (
                        data.map((book: SearchedBook, index: number) => (
                            <SearchedBooks
                                book={book}
                                onClick={onClick}
                                key={index}
                            />
                        ))
                    ) : (
                        <li>Loading</li>
                    )}
                </ul>
            ) : (
                <div>검색해주세요</div>
            )}
            <button onClick={() => console.log(data)}>버튼</button>
        </div>
    );
};
