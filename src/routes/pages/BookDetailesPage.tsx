import { BookDetails } from "@/components/BookDetailes";
import { supabase } from "@/supabase/Client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import camelcaseKeys from "camelcase-keys";

interface Review {
    author: string;
    coverImage: string;
    description: string;
    detailedReview: string;
    id: number;
    publishedDate: string;
    title: string;
    markdown: boolean;
}

export default function BookDetailsPage() {
    const { id } = useParams<string>();
    const [book, setBook] = useState<Review>();
    const [loading, setLoading] = useState(false);

    async function getBook() {
        setLoading(true);
        const { data: specificBook, error } = await supabase
            .from("book")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !specificBook) {
            setLoading(false);
            console.error(error);
            return;
        }

        setLoading(false);

        const camelBook = camelcaseKeys(specificBook);
        setBook(camelBook);
    }

    useEffect(() => {
        getBook();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BookDetails {...book} />
        </div>
    );
}
