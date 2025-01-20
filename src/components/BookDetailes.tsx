import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export interface BookDetailsProps {
    id: number;
    title: string;
    author: string;
    description: string;
    publishedDate: string;
    coverImage: string;
    detailedReview: string;
}

export function BookDetails({
    id,
    title,
    author,
    description,
    publishedDate,
    coverImage,
    detailedReview,
}: BookDetailsProps) {
    console.log(
        `${id}, ${title}, ${author}, ${description}, ${publishedDate}, ${coverImage}, ${detailedReview}}`
    );
    return (
        <div className="bg-[#F4A460] bg-opacity-20 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                    <img
                        src={coverImage || "/placeholder.svg"}
                        alt={`Cover of ${title}`}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2 text-[#8B4513]">
                        {title}
                    </h1>
                    <h2 className="text-xl mb-4 text-[#A0522D]">by {author}</h2>
                    <p className="mb-4 text-[#8B4513]">{description}</p>
                    <p className="mb-4 text-[#A0522D]">
                        Published on:{" "}
                        {format(new Date(publishedDate), "MMMM d, yyyy")}
                    </p>
                    <h3 className="text-2xl font-semibold mb-2 text-[#8B4513]">
                        Detailed Review
                    </h3>
                    <p className="mb-6 text-[#8B4513]">{detailedReview}</p>
                    <Button
                        onClick={() => window.history.back()}
                        className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
                    >
                        Back to List
                    </Button>
                </div>
            </div>
        </div>
    );
}
