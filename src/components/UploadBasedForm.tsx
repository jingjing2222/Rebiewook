import { BookSearch } from "@/components/BookSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface SearchedBook {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
}

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
}

export default function UploadBasedForm({
    onClick,
    content,
}: {
    onClick: (book: DBBook) => Promise<void>;
    content: string;
}) {
    const navigate = useNavigate();
    const [selectedBook, setSelectedBook] = useState<SearchedBook | undefined>(
        undefined
    );

    const { register, handleSubmit, setValue } = useForm<DBBook>();

    useEffect(() => {
        if (selectedBook) {
            setValue("title", selectedBook.title);
            setValue("author", selectedBook.authors[0]);
            setValue("cover_image", selectedBook.thumbnail);
        }
    }, [selectedBook, setValue]);

    return (
        <div className="space-y-6 bg-[#F4A460] bg-opacity-20 p-6 rounded-lg shadow-md">
            <BookSearch
                onClick={(book) => {
                    setSelectedBook(book);
                }}
            />
            <form className="space-y-6" onSubmit={handleSubmit(onClick)}>
                <div>
                    <Label htmlFor="title">제목</Label>
                    <Input id="title" {...register("title")} required />
                </div>
                <div>
                    <Label htmlFor="author">저자</Label>
                    <Input id="author" {...register("author")} required />
                </div>
                <div>
                    <Label htmlFor="description">간략한 설명</Label>
                    <Input
                        id="description"
                        {...register("description")}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="publishedDate">쓴 날</Label>
                    <Input
                        id="publishedDate"
                        type="date"
                        {...register("published_date")}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="coverImage">URL 주소</Label>
                    <Input
                        id="coverImage"
                        type="url"
                        {...register("cover_image")}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="detailedReview">독후감</Label>
                    <Textarea
                        id="detailedReview"
                        {...register("detailed_review")}
                        required
                        className="h-40"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
                    onClick={() => navigate("/")}
                >
                    {`${content} Book!`}
                </Button>
            </form>
        </div>
    );
}
