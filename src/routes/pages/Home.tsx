import { BookReviewGrid } from "@/components/home/BookReviewGrid";

export default function Home() {
    return (
        <>
            <div className="container mx-auto px-4 py-4 md:py-6">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-center text-[#4B3621] shadow-text">
                    최근 독후감
                </h1>
                <BookReviewGrid />
            </div>
        </>
    );
}
