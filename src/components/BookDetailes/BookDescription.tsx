import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
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
        <div className="">
            <h1 className="text-3xl font-bold mb-2 text-[#8B4513]">{title}</h1>
            <h2 className="text-xl mb-4 text-[#A0522D]">by {author}</h2>
            <p className="mb-4 text-[#8B4513]">{description}</p>
            <p className="mb-4 text-[#A0522D]">
                쓴 날: {format(new Date(publishedDate), "MMMM d, yyyy")}
            </p>

            <p className="mb-6 text-[#8B4513] p-3 border-black border-2 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-2 text-[#8B4513]">
                    독후감
                </h3>
                <MarkdownRenderer>{detailedReview}</MarkdownRenderer>
            </p>
            <div className="flex justify-between"></div>
        </div>
    );
};
