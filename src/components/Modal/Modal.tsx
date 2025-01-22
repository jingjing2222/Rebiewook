import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoginModal } from "@/components/Modal/LoginModal";
import DeleteModal from "@/components/Modal/DeleteModal";

export default function Modal({
    title,
    buttonColor,
    type,
    handleDelete = () => {},
}: {
    title: string;
    buttonColor: string;
    type: string;
    handleDelete?: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={`${buttonColor} text-white"`}>
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F4A460] bg-opacity-90">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#8B4513]">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {type === "Delete" && (
                    <DeleteModal
                        closeModal={closeModal}
                        handleDelete={handleDelete}
                    />
                )}
                {type === "Login" && <LoginModal closeModal={closeModal} />}
            </DialogContent>
        </Dialog>
    );
}
