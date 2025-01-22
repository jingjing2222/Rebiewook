import { BookCover } from "@/components/BookDetailes/BookCover";
import { BookDescription } from "@/components/BookDetailes/BookDescription";
import { BookDetailedMenu } from "@/components/BookDetailes/BookDetailedMenu";
import { supabase } from "@/supabase/Client";

interface Review {
    author: string;
    coverImage: string;
    description: string;
    detailedReview: string;
    id: number;
    publishedDate: string;
    title: string;
}

export function BookDetails({
    id,
    title,
    author,
    description,
    publishedDate,
    coverImage,
    detailedReview,
}: Review) {
    const handleDelete = async () => {
        const { error } = await supabase.from("book").delete().eq("id", id);
        if (error) console.log("error");
    };
    return (
        <div className="bg-[#F4A460] bg-opacity-20 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row">
                <BookCover coverImage={coverImage} title={title} />
                <div className="md:w-2/3">
                    <BookDescription
                        title={title}
                        author={author}
                        description={description}
                        publishedDate={publishedDate}
                        detailedReview={detailedReview}
                    />
                    <BookDetailedMenu handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}
