import { BookDetails } from "@/components/BookDetailes";
import { supabase } from "@/supabase/Client";
import { useParams } from "react-router";
import camelcaseKeys from "camelcase-keys";
import { useQuery } from "@tanstack/react-query";

export default function BookDetailsPage() {
    const { id } = useParams<string>();

    async function getBook() {
        const { data: specificBook } = await supabase
            .from("book")
            .select("*")
            .eq("id", id)
            .single();

        return specificBook;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getBook", id],
        queryFn: getBook,
        staleTime: 1000 * 10,
        select: (data) => camelcaseKeys(data),
    });

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        return <div>Book not found</div>;
    }
    if (data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <BookDetails {...data} />
            </div>
        );
    }
}
