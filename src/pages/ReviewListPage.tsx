import { BookCard } from "@/pages/home/BookCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SelectBox } from "@/components/SelectBox";
import { getReviews } from "@/api/api";

export interface ReviewListDTO {
  author: string;
  cover_image: string;
  description: string;
  detailed_review: string;
  id: number;
  published_date: string;
  title: string;
}

const selectList = [
  { name: "등록순", value: "published_date" },
  { name: "제목", value: "title" },
];

export default function ReviewListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState(selectList[0].value);
  const currentPage = parseInt(searchParams.get("page") || "0");

  const { status, data } = useQuery({
    queryKey: ["fetchReviews", currentPage, order],
    queryFn: () => {
      return getReviews(currentPage, order);
    },
    staleTime: 1000 * 20,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSelectChange = (value: string) => {
    setOrder(value);
    setSearchParams({ page: "0" });
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ page: nextPage.toString() });
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(0, currentPage - 1);
    setSearchParams({ page: prevPage.toString() });
  };

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Header Section with Title and SelectBox */}
      <div className="flex justify-end items-start sm:items-center gap-4 mb-6">
        {/* SelectBox Container */}
        <div className="flex flex-col items-end gap-2">
          <label className="text-sm text-gray-500 font-medium">Sort by</label>
          <div className="min-w-[140px]">
            <SelectBox value={selectList} onChange={handleSelectChange} />
          </div>
        </div>
      </div>

      {status === "error" ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-2">⚠️</div>
            <p className="text-red-600 font-medium">Error fetching data</p>
            <p className="text-gray-500 text-sm mt-1">Please try again later</p>
          </div>
        </div>
      ) : (
        <>
          {/* Books Grid */}
          <div className="bg-gradient-to-r from-yellow-800 to-yellow-700 shadow-lg rounded-3xl p-5 mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-transparent to-yellow-900/20 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {status === "pending"
                  ? Array.from({ length: 10 }, (_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-96 rounded-2xl"
                      />
                    ))
                  : data?.data.map((review: ReviewListDTO) => (
                      <BookCard key={review.id} review={review} />
                    ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
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
              disabled={!data?.pagination.hasNextPage}
              className="px-6 py-3 bg-gradient-to-r from-yellow-800 to-yellow-700 text-white font-semibold rounded-full shadow-lg hover:from-yellow-700 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
