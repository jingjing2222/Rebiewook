import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function DeleteModal({
    handleDelete,
    closeModal,
}: {
    handleDelete: () => void;
    closeModal: () => void;
}) {
    return (
        <>
            <form className="space-y-4">
                <div className="text-2xl font-bold text-[#8B4513]">
                    삭제하시겠습니까?
                </div>
                <div className="flex justify-center">
                    <Link to="/">
                        <Button
                            type="submit"
                            className="flex-initial bg-[#B22222] hover:bg-[#CD5C5C] mr-3"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    </Link>
                    <Button
                        type="button"
                        onClick={closeModal}
                        className="flex-initial ml-3"
                    >
                        아니요
                    </Button>
                </div>
            </form>
        </>
    );
}
