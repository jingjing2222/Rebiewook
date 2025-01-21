import { BookSearch } from "@/components/BookSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/supabase/Client";
import { DBBook, SearchedBook } from "@/types/Type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UploadForm() {
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

    async function updateBook(book: DBBook) {
        const { data, error } = await supabase
            .from("book")
            .insert(book)
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }

    return (
        <div className="space-y-6 bg-[#F4A460] bg-opacity-20 p-6 rounded-lg shadow-md">
            <BookSearch setSelectedBook={setSelectedBook} />
            <form className="space-y-6" onSubmit={handleSubmit(updateBook)}>
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
                >
                    Upload Book Review
                </Button>
            </form>
        </div>
    );
}
