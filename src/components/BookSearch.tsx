import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SearchedBooks from "@/components/SearchedBooks";

interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
}

export const BookSearch = ({
    onClick,
}: {
    onClick: (book: SearchedBook) => void;
}) => {
    const inputTitle = useRef("");
    const [loading, setLoading] = useState(false);
    const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            fetchBooks(inputTitle.current);
        }
    };

    const fetchBooks = async (books: string) => {
        setLoading(true);
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${books}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.documents);
        setSearchedBooks(data.documents);
        setLoading(false);
        return data;
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
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={() => fetchBooks(inputTitle.current)}>
                    Search
                </Button>
            </div>
            {!loading ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {searchedBooks.length > 0 ? (
                        searchedBooks.map(
                            (book: SearchedBook, index: number) => (
                                <SearchedBooks
                                    book={book}
                                    onClick={onClick}
                                    key={index}
                                />
                            )
                        )
                    ) : (
                        <li>책 정보 없음</li>
                    )}
                </ul>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};
