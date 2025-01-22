import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { supabase } from "@/supabase/Client";
import camelcaseKeys from "camelcase-keys";

interface Review {
    author: string;
    coverImage: string;
    description: string;
    detailedReview: string;
    id: number;
    publishedDate: string;
    title: string;
}

export const BookReviewGrid = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            const { data: book, error } = await supabase
                .from("book")
                .select("*");

            if (error || !book) {
                console.error(error);
                return;
            }

            const camelCasedBook = camelcaseKeys(book);
            setLoading(false);
            setReviews(camelCasedBook);
        }
        setLoading(true);
        fetchReviews();
    }, []);
    if (loading) return <div>loading...</div>;
    return (
        <div className="bookshelf">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {reviews.map((review: Review) => (
                    <BookCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};
