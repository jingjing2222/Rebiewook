import { useState } from "react";
import BookCard from "./BookCard";

const bookReviews = [
    {
        id: 1,
        title: "The Midnight Library",
        description: "A novel about regret, hope, and transformation",
        publishedDate: "2023-05-15",
        coverImage:
            "/placeholder.svg?height=300&width=200&text=The+Midnight+Library",
    },
    {
        id: 2,
        title: "Atomic Habits",
        description: "Tiny changes, remarkable results",
        publishedDate: "2023-05-10",
        coverImage: "/placeholder.svg?height=300&width=200&text=Atomic+Habits",
    },
    {
        id: 3,
        title: "Project Hail Mary",
        description: "A lone astronaut must save humanity",
        publishedDate: "2023-05-05",
        coverImage:
            "/placeholder.svg?height=300&width=200&text=Project+Hail+Mary",
    },
    {
        id: 4,
        title: "The Four Winds",
        description: "A portrait of America during the Great Depression",
        publishedDate: "2023-04-30",
        coverImage: "/placeholder.svg?height=300&width=200&text=The+Four+Winds",
    },
    {
        id: 5,
        title: "Klara and the Sun",
        description: "An exploration of what it means to love",
        publishedDate: "2023-04-25",
        coverImage:
            "/placeholder.svg?height=300&width=200&text=Klara+and+the+Sun",
    },
];

export default function BookReviewGrid() {
    const [reviews] = useState(bookReviews);

    return (
        <div className="bookshelf">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {reviews.map((review) => (
                    <BookCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
