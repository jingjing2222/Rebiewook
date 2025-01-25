import UploadBasedForm from "@/components/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useQuery } from "@tanstack/react-query";
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

    const { data, isLoading, isError } = useQuery<DBBook>({
        queryKey: ["getBookData", id],
        queryFn: () => getBookData(),
        staleTime: 1000 * 10,
    });
    async function updateBook(book: DBBook) {
        getBookData();
        const { data, error } = await supabase
            .from("book")
            .update(book)
            .eq("id", id);
        if (error) {
            console.error(error);
        } else {
            navigate("/");
            console.log(data);
        }
    }
    async function getBookData() {
        const { data: book } = await supabase
            .from("book")
            .select("*")
            .eq("id", id)
            .single();

        return book;
    }

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;
    if (data)
        return (
            <>
                <UploadBasedForm
                    onClick={updateBook}
                    content="Edit"
                    defaultValue={data}
                />
            </>
        );
};
