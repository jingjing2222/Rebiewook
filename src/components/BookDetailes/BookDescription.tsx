import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { format } from "date-fns";

export const BookDescription = ({
    title,
    author,
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
        <div>
            <div className="flex mb-4 items-center justify-between">
                <p className="flex-initial">
                    <h1 className="text-3xl font-bold mb-2 text-[#8B4513] inline">
                        {title}
                    </h1>
                    <h2 className="text-xl mb-4 text-[#A0522D] inline ">
                        {" "}
                        by {author}
                    </h2>
                </p>
                <div className="flex-initial mb-4 text-[#A0522D] inline">
                    {`  ${format(new Date(publishedDate), "MMMM d, yyyy")}`}
                </div>
            </div>

            <p className="mb-6 text-[#8B4513] p-3 border-black border-2 rounded-2xl">
                <MarkdownRenderer>{detailedReview}</MarkdownRenderer>
            </p>
            <div className="flex justify-between"></div>
        </div>
    );
};
