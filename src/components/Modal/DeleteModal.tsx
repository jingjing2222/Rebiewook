import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase/Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function DeleteModal({
    closeModal,
    id,
}: {
    closeModal: () => void;
    id?: number;
}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: deleteMuation } = useMutation({
        mutationKey: ["deleteMutation"],
        mutationFn: async () => {
            await supabase.from("book").delete().eq("id", id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchReviews"] });
            navigate("/");
            closeModal();
        },
    });
    return (
        <>
            <form className="space-y-4">
                <div className="text-2xl font-bold text-[#8B4513]">
                    삭제하시겠습니까?
                </div>
                <div className="flex justify-center">
                    <Button
                        type="button"
                        className="flex-initial bg-[#B22222] hover:bg-[#CD5C5C] mr-3"
                        onClick={() => deleteMuation()}
                    >
                        삭제
                    </Button>
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
