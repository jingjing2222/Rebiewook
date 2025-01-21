import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function BaseModal({
    children,
    title,
    handleClick,
    buttonColor,
}: {
    children: React.ReactNode;
    title: string;
    handleClick: (data: FormData, closeModal: () => void) => void;
    buttonColor: string;
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
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleClick(formData, closeModal);
                    }}
                >
                    {children}
                </form>
            </DialogContent>
        </Dialog>
    );
}
