import UploadBasedForm from "@/pages/UploadForm/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
}

export const UploadPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: insertBookMutation } = useMutation({
        mutationKey: ["insertBook"],
        mutationFn: (book: DBBook) => insertBook(book),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchReviews"] });
            navigate("/");
        },
    });

    async function insertBook(book: DBBook) {
        const { data, error } = await supabase
            .from("book")
            .insert(book)
            .select();
        if (error) {
            console.error(error);
        }
        return data;
    }

    return (
        <>
            <UploadBasedForm onClick={insertBookMutation} content="Upload" />
        </>
    );
};
