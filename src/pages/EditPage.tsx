import UploadBasedForm from "@/pages/UploadForm/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
    markdown: boolean;
}

export const EditPage = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery<DBBook>({
        queryKey: ["getBookData", id],
        queryFn: () => getBookData(),
        staleTime: 1000 * 600,
    });
    async function getBookData() {
        const { data: book } = await supabase
            .from("book")
            .select("*")
            .eq("id", id)
            .single();

        return book;
    }

    const { mutate: updateBookMutation } = useMutation({
        mutationKey: ["updateBook"],
        mutationFn: (book: DBBook) => updateBook(book),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchReviews"] });
            queryClient.invalidateQueries({ queryKey: ["getBook", id] });
            navigate("/");
        },
        onError: () => {
            console.log("실패했습니다!");
        },
    });
    async function updateBook(book: DBBook) {
        getBookData();
        const { data, error } = await supabase
            .from("book")
            .update(book)
            .eq("id", id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;
    if (data)
        return (
            <>
                <UploadBasedForm
                    onClick={updateBookMutation}
                    content="Edit"
                    defaultValue={data}
                />
            </>
        );
};
