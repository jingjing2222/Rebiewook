import { BookCard } from "@/pages/home/BookCard";
import { supabase } from "@/supabase/Client";
import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function ReviewListPage() {
  const { status, data } = useQuery({
    queryKey: ["fetchReviews"],
    queryFn: fetchReviews,
    staleTime: 1000 * 60,
  });
  return (
    <>
      <div className="container mx-auto px-4 py-4 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.5 },
          }}
          className="text-xl md:text-2xl font-bold mb-4 text-center text-[#4B3621] shadow-text"
        >
          최근 독후감
        </motion.div>
        {status === "error" ? (
          <div>Error fetching data</div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-yellow-800 to-yellow-700 shadow-lg rounded-3xl p-5 mb-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-transparent to-yellow-900/20 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {status === "pending"
                    ? Array.from({ length: 5 }, (_, index) => (
                        <Skeleton
                          key={index}
                          className="w-full h-96 rounded-2xl"
                        />
                      ))
                    : camelcaseKeys(data!).map((review: Review) => (
                        <BookCard key={review.id} review={review} />
                      ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
