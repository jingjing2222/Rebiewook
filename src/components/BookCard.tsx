import { format } from "date-fns";
import { Link } from "react-router";

interface BookReview {
    id: number;
    title: string;
    description: string;
    publishedDate: string;
    coverImage: string;
}

interface BookCardProps {
    review: BookReview;
}

export default function BookCard({ review }: BookCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
            <Link to={`/bookdetails/${review.id}`}>
                <div className="relative aspect-[2/3] w-full">
                    <img
                        src={review.coverImage || "/placeholder.svg"}
                        alt={`Cover of ${review.title}`}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                        {review.title}
                    </h2>
                    <p className="text-gray-600 mb-2 line-clamp-3">
                        {review.description}
                    </p>
                    <p className="text-sm text-gray-500">
                        {format(new Date(review.publishedDate), "MMMM d, yyyy")}
                    </p>
                </div>
            </Link>
        </div>
    );
}
