import { ModalContext } from "@/components/Modal/ModalContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

export const BookDetailedMenu = ({ id }: { id: number }) => {
    const [cookies] = useCookies(["username"]);

    const { openModal, setModal } = useContext(ModalContext);
    return (
        <>
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
        </>
    );
};
