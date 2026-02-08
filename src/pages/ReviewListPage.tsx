import { BookOpenText, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { getReviews } from "@/api/api";
import { SelectBox } from "@/components/SelectBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard } from "@/pages/home/BookCard";

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
  const currentPage = Number.parseInt(searchParams.get("page") || "0", 10);

  const { status, data } = useQuery({
    queryKey: ["fetchReviews", currentPage, order],
    queryFn: () => getReviews(currentPage, order),
    staleTime: 1000 * 20,
  });

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
    <div className="space-y-6">
      <Card className="panel-surface border-none">
        <CardHeader className="flex flex-col gap-4 pb-0 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
              <BookOpenText className="h-6 w-6 text-primary" />
              Review Library
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">책을 읽고 남긴 생각을 카드 형식으로 모아봤어요.</p>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <SelectBox value={selectList} onChange={handleSelectChange} />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {status === "error" ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-6 text-center">
              <div>
                <p className="text-base font-semibold text-destructive">리뷰를 불러오지 못했어요.</p>
                <p className="mt-1 text-sm text-muted-foreground">잠시 후 다시 시도해 주세요.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {status === "pending"
                  ? Array.from({ length: 8 }, (_, index) => <Skeleton key={index} className="h-[420px] rounded-2xl" />)
                  : data?.data.map((review: ReviewListDTO) => <BookCard key={review.id} review={review} />)}
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 0}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{currentPage + 1}</span>
                </div>

                <Button variant="outline" onClick={handleNextPage} disabled={!data?.pagination.hasNextPage}>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
