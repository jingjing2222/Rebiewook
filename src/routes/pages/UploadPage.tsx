import UploadBasedForm from "@/components/UploadBasedForm";
import { supabase } from "@/supabase/Client";

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
}

export const UploadPage = () => {
    async function insertBook(book: DBBook) {
        const { data, error } = await supabase
            .from("book")
            .insert(book)
            .select();
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }

    return (
        <>
            <UploadBasedForm onClick={insertBook} />
        </>
    );
};
