import { createContext, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createPortal } from "react-dom";

interface ModalContextProps {
    openModal: () => void;
    closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
    openModal: () => {},
    closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {createPortal(
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#F4A460] bg-opacity-90">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#8B4513]">
                                {"모달"}
                            </DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>,
                document.body
            )}
        </ModalContext.Provider>
    );
}
