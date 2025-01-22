import { format } from "date-fns";

export const BookDescription = ({
    title,
    author,
    description,
    publishedDate,
    detailedReview,
}: {
    title: string;
    author: string;
    description: string;
    publishedDate: string;
    detailedReview: string;
}) => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-2 text-[#8B4513]">{title}</h1>
            <h2 className="text-xl mb-4 text-[#A0522D]">by {author}</h2>
            <p className="mb-4 text-[#8B4513]">{description}</p>
            <p className="mb-4 text-[#A0522D]">
                Published on: {format(new Date(publishedDate), "MMMM d, yyyy")}
            </p>
            <h3 className="text-2xl font-semibold mb-2 text-[#8B4513]">
                Detailed Review
            </h3>
            <p className="mb-6 text-[#8B4513]">{detailedReview}</p>
            <div className="flex justify-between"></div>
        </>
    );
};
