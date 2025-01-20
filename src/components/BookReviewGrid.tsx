/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { supabase } from "@/supabase/Client";
import camelcaseKeys from "camelcase-keys";

export interface BookDetailsProps {
    id: number;
    title: string;
    author: string;
    description: string;
    publishedDate: string;
    coverImage: string;
    detailedReview: string;
}

export default function BookReviewGrid() {
    const [reviews, setReviews] = useState<BookDetailsProps[]>([]);

    useEffect(() => {
        (async () => {
            const { data: book, error } = await supabase
                .from("book")
                .select("*")
                .returns<BookDetailsProps[]>(); // 명확한 타입 지정
            console.log(camelcaseKeys(book));
            setReviews(camelcaseKeys(book));
        })();
    }, []);

    return (
        <div className="bookshelf">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {reviews.map((review) => (
                    <BookCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
