import { BookCard } from "@/pages/home/BookCard";
import { supabase } from "@/supabase/Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export interface ReviewListDTO {
  author: string;
  cover_image: string;
  description: string;
  detailed_review: string;
  id: number;
  published_date: string;
  title: string;
}

const fetchReviews = async (page = 0) => {
  const startIndex = page * 10;
  const endIndex = startIndex + 9;
  const data = await supabase
    .from("book")
    .select("*")
    .order("published_date", { ascending: false })
    .range(startIndex, endIndex);
  return data;
};

export default function ReviewListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0");

  const { status, data } = useQuery({
    queryKey: ["fetchReviews", currentPage],
    queryFn: () => {
      return fetchReviews(currentPage);
    },
    staleTime: 1000 * 60,
  });

  useMemo(() => {
    console.log(data);
  }, [data]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ page: nextPage.toString() });
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(0, currentPage - 1);
    setSearchParams({ page: prevPage.toString() });
  };

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
                    : data?.data!.map((review: ReviewListDTO) => (
                        <BookCard key={review.id} review={review} />
                      ))}
                </div>
              </div>
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="px-6 py-3 bg-gradient-to-r from-yellow-800 to-yellow-700 text-white font-semibold rounded-full shadow-lg hover:from-yellow-700 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-white/90 text-[#4B3621] font-medium rounded-full shadow-md">
                Page {currentPage + 1}
              </span>

              <button
                onClick={handleNextPage}
                disabled={data?.data?.length !== 10}
                className="px-6 py-3 bg-gradient-to-r from-yellow-800 to-yellow-700 text-white font-semibold rounded-full shadow-lg hover:from-yellow-700 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
