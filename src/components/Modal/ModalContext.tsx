import { createContext, useReducer, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createPortal } from "react-dom";
import { LoginModal } from "@/components/Modal/LoginModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { SignupModal } from "@/components/Modal/SignupModal";

interface ModalContextProps {
    openModal: () => void;
    closeModal: () => void;
    setModal: (type: string, id?: number) => void;
}

interface ActionType {
    type: string;
    id: number;
}

interface ModalType {
    title: string;
    content?: string;
    type: string;
    id?: number;
}

export const ModalContext = createContext<ModalContextProps>({
    openModal: () => {},
    closeModal: () => {},
    setModal: () => {},
});

const reducer = (modalType: ModalType, action: ActionType) => {
    switch (action.type.toUpperCase()) {
        case "LOGIN":
            return {
                title: "Login",
                content: "Login 내용",
                type: "LOGIN",
            };
        case "DELETE":
            return {
                title: "Delete",
                content: "Delete 내용",
                type: "DELETE",
                id: action.id,
            };
        case "SIGNUP":
            return {
                title: "회원가입",
                content: "Default 내용",
                type: "SIGNUP",
            };
        case "DEFAULT":
        default:
            return {
                title: "Default",
                content: "Default 내용",
                type: "DEFAULT",
            };
    }
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const Type = {
        title: "Default",
        content: "Default 내용",
        type: "DEFAULT",
        id: 0,
    };
    const [modalType, dispatch] = useReducer(reducer, Type);

    function openModal() {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const setModal = (type: string, id = 0) => {
        dispatch({ type, id });
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, setModal }}>
            {children}
            {createPortal(
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-[425px] bg-[#F4A460] bg-opacity-90">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#8B4513]">
                                {modalType.title}
                            </DialogTitle>
                        </DialogHeader>
                        {modalType.type === "LOGIN" && (
                            <LoginModal closeModal={closeModal} />
                        )}
                        {modalType.type === "DELETE" && (
                            <DeleteModal
                                closeModal={closeModal}
                                id={modalType.id}
                            />
                        )}
                        {modalType.type === "SIGNUP" && (
                            <SignupModal closeModal={closeModal} />
                        )}
                    </DialogContent>
                </Dialog>,
                document.body
            )}
        </ModalContext.Provider>
    );
}
