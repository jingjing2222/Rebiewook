import { Link } from "react-router";
import { ReviewListDTO } from "@/pages/ReviewListPage";

export const BookCard = ({ review }: { review: ReviewListDTO }) => {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <Link to={`/bookdetailes/${review.id}`}>
        <div className="relative w-full">
          <img
            src={review.cover_image || "/placeholder.svg"}
            alt={`Cover of ${review.title}`}
            className="object-cover w-11/12 h-full my-1 ml-1.5 md:ml-2.5 md:mt-2 rounded-lg"
          />
        </div>
        <div className="p-2 md:p-4">
          <h2 className="text-md font-semibold mb-2 line-clamp-2">
            {review.title}
          </h2>
          <p className="text-gray-600 mb-2 text-sm line-clamp-3">
            {review.description}
          </p>
          <p className="text-sm text-gray-500">{review.published_date}</p>
        </div>
      </Link>
    </div>
  );
};
