import { BookSearch } from "@/components/BookSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
import MDEditor from "@uiw/react-md-editor";

interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
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
    isSuccess?: string | undefined;
}) {
    const [selectedBook, setSelectedBook] = useState<SearchedBook | undefined>(
        undefined
    );
    const [mdValue, setMdValue] = useState(
        "# Form과 마크다운 둘 중 하나 선택 가능합니다~"
    );
    const { register, handleSubmit, setValue } = useForm<DBBook>();
    const [editerChoice, setEditerChoice] = useState(true);

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
                    <Label htmlFor="detailedReview">
                        독후감
                        <Button
                            onClick={(e) => {
                                setEditerChoice((prev) => !prev);
                                e.preventDefault();
                            }}
                        >
                            에디터 변경
                        </Button>
                    </Label>
                    {editerChoice ? (
                        <Textarea
                            id="detailedReview"
                            {...register("detailed_review")}
                            required
                            className="h-40"
                        />
                    ) : (
                        <MDEditor
                            height={500}
                            value={mdValue}
                            onChange={(e) => {
                                setValue("detailed_review", e!);
                                setMdValue(e!);
                            }}
                        />
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
                >
                    {`${content} Book!`}
                </Button>
            </form>
        </div>
    );
}
