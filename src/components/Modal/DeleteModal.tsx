import { Button } from "@/components/ui/button";

export default function DeleteModal({
    closeModal,
}: {
    closeModal: () => void;
}) {
    return (
        <>
            <form className="space-y-4">
                <div className="text-2xl font-bold text-[#8B4513]">
                    삭제하시겠습니까?
                </div>
                <div className="flex justify-center">
                    <Button className="flex-initial bg-[#B22222] hover:bg-[#CD5C5C] mr-3">
                        삭제
                    </Button>
                    <Button onClick={closeModal} className="flex-initial ml-3">
                        아니요
                    </Button>
                </div>
            </form>
        </>
    );
}
