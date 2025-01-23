import { BookReviewGrid } from "@/components/BookReviewGrid";
import { ModalContext } from "@/components/Modal/ModalContext";
import { useContext } from "react";

export default function Home() {
    const { openModal, dispatch } = useContext(ModalContext);
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={() => {
                        openModal();
                        dispatch({ type: "delete" });
                    }}
                >
                    모달 출력!
                </button>
                <h1 className="text-3xl font-bold mb-8 text-center text-[#4B3621] shadow-text">
                    최근 독후감
                </h1>
                <BookReviewGrid />
            </div>
        </>
    );
}
