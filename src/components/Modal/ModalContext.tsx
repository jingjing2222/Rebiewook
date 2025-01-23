import { createContext, useReducer, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createPortal } from "react-dom";

interface ModalContextProps {
    openModal: () => void;
    closeModal: () => void;
    dispatch: (action: ActionType) => void;
}

interface ActionType {
    type: string;
}

interface ModalType {
    title: string;
    content: string;
    what: string;
}

export const ModalContext = createContext<ModalContextProps>({
    openModal: () => {},
    closeModal: () => {},
    dispatch: () => {},
});

function reducer(modalType: ModalType, action: ActionType) {
    switch (action.type.toUpperCase()) {
        case "LOGIN":
            return {
                ...modalType,
                title: "Login",
                content: "Login 내용",
                what: "LOGIN",
            };
        case "DELETE":
            return {
                ...modalType,
                title: "Delete",
                content: "Delete 내용",
                what: "DELETE",
            };
        case "DEFAULT":
        default:
            return {
                ...modalType,
                title: "Default",
                content: "Default 내용",
                what: "DEFAULT",
            };
    }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const Type = {
        title: "Default",
        content: "Default 내용",
        what: "DEFAULT",
    };
    const [modalType, dispatch] = useReducer(reducer, Type);

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, dispatch }}>
            {children}
            {createPortal(
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-[425px] bg-[#F4A460] bg-opacity-90">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#8B4513]">
                                {modalType.title}
                            </DialogTitle>
                        </DialogHeader>
                        {modalType.content}
                    </DialogContent>
                </Dialog>,
                document.body
            )}
        </ModalContext.Provider>
    );
}
