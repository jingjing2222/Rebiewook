import BookReviewGrid from "@/components/BookReviewGrid";

export default function Home() {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-[#4B3621] shadow-text">
                    최근 독후감
                </h1>
                <BookReviewGrid />
            </div>
        </>
    );
}
