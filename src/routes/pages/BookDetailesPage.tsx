import { BookDetailsProps, BookDetails } from "@/components/BookDetailes";
import { useParams } from "react-router";

const bookData = {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "A novel about regret, hope, and transformation",
    publishedDate: "2023-05-15",
    coverImage:
        "/placeholder.svg?height=300&width=200&text=The+Midnight+Library",
    detailedReview:
        "The Midnight Library is a thought-provoking and emotionally resonant novel that explores the concept of life's infinite possibilities. Matt Haig masterfully weaves a tale of Nora Seed, a woman who finds herself in a library between life and death, where each book represents a different path her life could have taken. Through Nora's journey, readers are invited to reflect on their own choices, regrets, and the ripple effects of their actions. Haig's prose is both accessible and profound, making complex philosophical ideas digestible without losing their impact. The novel's pacing keeps readers engaged, with each of Nora's alternate lives offering new insights and emotional depth. While the concept isn't entirely novel, Haig's execution is fresh and deeply moving. The Midnight Library serves as a poignant reminder of the value of life, the importance of perspective, and the power of second chances. It's a must-read for anyone grappling with 'what ifs' or seeking a renewed appreciation for their current path in life.",
};

export default function BookDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const book: BookDetailsProps = {
        ...bookData,
        id: id ? Number(id) : bookData.id,
    };

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BookDetails {...book} />
        </div>
    );
}
