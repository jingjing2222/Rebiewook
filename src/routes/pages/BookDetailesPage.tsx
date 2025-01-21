import { BookDetails } from "@/components/BookDetailes";
import { supabase } from "@/supabase/Client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import camelcaseKeys from "camelcase-keys";
import { Review } from "@/types/Type";

export default function BookDetailsPage() {
    const { id } = useParams<string>();
    const [book, setBook] = useState<Review>();

    useEffect(() => {
        (async () => {
            const { data: specificBook, error } = await supabase
                .from("book")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !specificBook) {
                console.error(error);
                return;
            }

            const camelBook = camelcaseKeys(specificBook);
            setBook(camelBook);
        })();
    }, [id]);

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BookDetails {...book} />
        </div>
    );
}
