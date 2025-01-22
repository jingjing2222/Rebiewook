import UploadBasedForm from "@/components/UploadBasedForm";
import { supabase } from "@/supabase/Client";
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

    async function insertBook(book: DBBook) {
        const { data, error } = await supabase
            .from("book")
            .insert(book)
            .select();
        if (error) {
            console.error(error);
        } else {
            navigate("/");
            console.log(data);
        }
    }

    return (
        <>
            <UploadBasedForm onClick={insertBook} content="Upload" />
        </>
    );
};
