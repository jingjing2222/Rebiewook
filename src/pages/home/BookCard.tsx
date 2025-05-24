import { Link } from "react-router";
import { ReviewListDTO } from "@/pages/ReviewListPage";

export const BookCard = ({ review }: { review: ReviewListDTO }) => {
  return (
    <Link to={`/bookdetailes/${review.id}`}>
      <div className="flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 h-full">
        <div className="relative w-full flex-[6]">
          <img
            src={review.cover_image || "/placeholder.svg"}
            alt={`Cover of ${review.title}`}
            className="object-cover w-11/12 h-full my-1 ml-1.5 md:ml-2.5 md:mt-2 rounded-lg"
          />
        </div>
        <div className="flex-[2] p-2 md:p-4 flex flex-col justify-between">
          <div className="flex-1">
            <h2 className="text-md font-semibold mb-2 line-clamp-2">
              {review.title}
            </h2>
            <p className="text-gray-600 mb-2 text-sm line-clamp-3 flex-1">
              {review.description}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-auto">
            {review.published_date}
          </p>
        </div>
      </div>
    </Link>
  );
};
