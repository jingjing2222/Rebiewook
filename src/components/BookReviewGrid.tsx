import { BookCard } from "./BookCard";
import { supabase } from "@/supabase/Client";
import camelcaseKeys from "camelcase-keys";
import { useQuery } from "@tanstack/react-query";

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
    const fetchReviews = async () => {
        const { data: book, error } = await supabase
            .from("book")
            .select("*")
            .order("published_date", { ascending: false });

        if (error || !book) {
            console.error(error);
            return;
        }
        return book;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["fetchReviews"],
        queryFn: fetchReviews,
        staleTime: 1000 * 10,
    });

    if (isLoading) {
        return <div>loading...</div>;
    }
    if (isError) {
        return <div>Error fetching data</div>;
    }
    if (data) {
        return (
            <>
                <div className="bookshelf">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {camelcaseKeys(data).map((review: Review) => (
                            <BookCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
};
