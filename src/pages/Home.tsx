import { BookCard } from "@/pages/home/BookCard";
import { supabase } from "@/supabase/Client";
import { useQuery } from "@tanstack/react-query";
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

const fetchReviews = async () => {
    const { data: book } = await supabase
        .from("book")
        .select("*")
        .order("published_date", { ascending: false });

    return book;
};

export default function Home() {
    const { status, data } = useQuery({
        queryKey: ["fetchReviews"],
        queryFn: fetchReviews,
        staleTime: 1000 * 60,
    });
    return (
        <>
            <div className="container mx-auto px-4 py-4 md:py-6">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-center text-[#4B3621] shadow-text">
                    최근 독후감
                </h1>
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
            </div>
        </>
    );
}
