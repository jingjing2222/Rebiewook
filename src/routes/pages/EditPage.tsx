import UploadBasedForm from "@/components/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useParams } from "react-router";

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
}

export const EditPage = () => {
    const { id } = useParams<string>();

    async function updateBook(book: DBBook) {
        const { data, error } = await supabase
            .from("book")
            .update(book)
            .eq("id", id)
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }

    return (
        <>
            <UploadBasedForm onClick={updateBook} />
        </>
    );
};
