import { BookReviewGrid } from "@/components/BookReviewGrid";
import { ModalContext } from "@/components/Modal/ModalContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export default function Home() {
    const { openModal, setModal } = useContext(ModalContext);
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Button
                    onClick={() => {
                        openModal();
                        setModal("delete");
                    }}
                >
                    Delete
                </Button>
                <h1 className="text-3xl font-bold mb-8 text-center text-[#4B3621] shadow-text">
                    최근 독후감
                </h1>
                <BookReviewGrid />
            </div>
        </>
    );
}
