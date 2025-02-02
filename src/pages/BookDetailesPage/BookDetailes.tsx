import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { ModalContext } from "@/components/Modal/ModalContext";
import { format } from "date-fns";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

interface Review {
    author: string;
    coverImage: string;
    description: string;
    detailedReview: string;
    id: number;
    publishedDate: string;
    title: string;
    markdown: boolean;
}

export function BookDetails({
    id,
    title,
    author,
    publishedDate,
    coverImage,
    detailedReview,
    markdown,
}: Review) {
    const [cookies] = useCookies(["username"]);
    const { openModal, setModal } = useContext(ModalContext);

    return (
        <>
            <div className="bg-[#F4A460] bg-opacity-20 p-6 rounded-3xl shadow-md">
                <div className="flex flex-col md:flex-row">
                    <div className="flex justify-center md:w-1/3 mb-6 md:mb-0">
                        <img
                            src={coverImage || "/placeholder.svg"}
                            alt={`Cover of ${title}`}
                            className="w-6/12 h-fit rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <div>
                            <div className="flex mb-4 items-center justify-between">
                                <div className="flex-initial flex flex-col">
                                    <div className="text-lg md:text-3xl font-bold mb-2 text-[#8B4513] inline">
                                        {title}
                                    </div>
                                    <div className="text-base md:text-xl mb-4 text-[#A0522D] inline ">
                                        by {author}
                                    </div>
                                    <div className="flex-initial text-sm mb-4 text-[#A0522D] inline">
                                        {`${format(new Date(publishedDate), "yyyy-MM-dd")}`}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 text-[#8B4513] p-3 border-black border-2 rounded-2xl md:min-h">
                                {markdown ? (
                                    <MarkdownRenderer>
                                        {detailedReview}
                                    </MarkdownRenderer>
                                ) : (
                                    <p className="whitespace-pre-wrap">
                                        {detailedReview}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex-initial flex justify-between">
                            <Button
                                onClick={() => window.history.back()}
                                className="flex-initial bg-[#8B4513] hover:bg-[#A0522D] text-white"
                            >
                                목록
                            </Button>
                            {cookies.username && (
                                <div>
                                    <Link to="edit">
                                        <Button className="mx-2">수정</Button>
                                    </Link>
                                    <Button
                                        className="bg-[#B22222] hover:bg-[#CD5C5C]"
                                        onClick={() => {
                                            openModal();
                                            setModal("delete", id);
                                        }}
                                    >
                                        삭제
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
