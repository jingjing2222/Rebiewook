import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

export const BookDetailedMenu = ({
    handleDelete = () => {},
}: {
    handleDelete?: () => void;
}) => {
    const [cookies] = useCookies(["username"]);

    return (
        <>
            <Button
                onClick={() => window.history.back()}
                className="flex-initial bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
                목록
            </Button>
            {cookies.username && (
                <div className="flex-initial flex justify-end">
                    <Link to="edit">
                        <Button className="mx-2">수정</Button>
                    </Link>
                    <Modal
                        type="Delete"
                        title="삭제"
                        buttonColor="bg-[#B22222] hover:bg-[#CD5C5C]"
                        handleDelete={handleDelete}
                    />
                </div>
            )}
        </>
    );
};
