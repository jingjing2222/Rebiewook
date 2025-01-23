import { BookCover } from "@/components/BookDetailes/BookCover";
import { BookDescription } from "@/components/BookDetailes/BookDescription";
import { BookDetailedMenu } from "@/components/BookDetailes/BookDetailedMenu";

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
    return (
        <>
            <div className="bg-[#F4A460] bg-opacity-20 p-6 rounded-full shadow-md ">
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
                        <BookDetailedMenu id={id} />
                    </div>
                </div>
            </div>
        </>
    );
}
