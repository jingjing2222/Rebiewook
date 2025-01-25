import UploadBasedForm from "@/components/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useEffect, useState } from "react";
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
    const [defaultValue, setDefalutValue] = useState<DBBook | undefined>(
        undefined
    );
    const { id } = useParams<string>();
    const navigate = useNavigate();

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
        const { data: book, error } = await supabase
            .from("book")
            .select("*")
            .eq("id", id)
            .single();

        if (error) console.error(error);
        else setDefalutValue(book);
    }
    useEffect(() => {
        getBookData();
    }, []);

    return (
        <>
            <UploadBasedForm
                onClick={updateBook}
                content="Edit"
                defaultValue={defaultValue}
            />
        </>
    );
};
