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
                <div className="flex-initial flex flex-col">
                    <div className="text-lg md:text-3xl font-bold mb-2 text-[#8B4513] inline">
                        {title}
                    </div>
                    <div className="text-base md:text-xl mb-4 text-[#A0522D] inline ">
                        {" "}
                        by {author}
                    </div>
                    <div className="flex-initial text-sm mb-4 text-[#A0522D] inline">
                        {`  ${format(new Date(publishedDate), "yyyy-MM-dd")}`}
                    </div>
                </div>
            </div>

            <div className="mb-6 text-[#8B4513] p-3 border-black border-2 rounded-2xl">
                <MarkdownRenderer>{detailedReview}</MarkdownRenderer>
            </div>
            <div className="flex justify-between"></div>
        </div>
    );
};
