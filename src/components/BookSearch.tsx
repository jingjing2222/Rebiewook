/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SearchedBooks from "@/components/SearchedBooks";

export interface SearchedBook {
    documents: object | undefined;
    meta: object | undefined;
}

export function BookSearch({ setSelectedBook }) {
    const inputTitle = useRef(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);

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
        console.log(data);
        setSearchedBooks(data);
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
                />
                <Button onClick={() => fetchBooks(inputTitle.current)}>
                    Search
                </Button>
            </div>
            {!loading ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {searchedBooks?.documents?.length > 0 ? (
                        searchedBooks.documents.map((book, index) => (
                            <SearchedBooks
                                book={book}
                                setSelectedBook={setSelectedBook}
                                index={index}
                            />
                        ))
                    ) : (
                        <li>책 정보 없음</li>
                    )}
                </ul>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}
