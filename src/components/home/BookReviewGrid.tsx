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

const fetchReviews = async () => {
    const { data: book } = await supabase
        .from("book")
        .select("*")
        .order("published_date", { ascending: false });

    return book;
};

export const BookReviewGrid = () => {
    //알아서 타입을 추론하므로 타입을 명시하지 않음
    const { status, data } = useQuery({
        queryKey: ["fetchReviews"],
        queryFn: fetchReviews,
        staleTime: 1000 * 60,
    });

    return (
        <>
            {status === "pending" ? (
                <div>loading...</div>
            ) : status === "error" ? (
                <div>Error fetching data</div>
            ) : (
                <>
                    <div className="bookshelf">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {camelcaseKeys(data!).map((review: Review) => (
                                <BookCard key={review.id} review={review} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
