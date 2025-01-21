import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children }: { children: ReactNode }) => {
    const reference = useRef<HTMLDialogElement | null>(null);
    function open(): void {
        reference.current!.showModal();
    }
    function close(): void {
        reference.current!.close();
    }
    return (
        <>
            <button onClick={open}>열기</button>
            {/* Modal Dialog */}
            {createPortal(
                <dialog ref={reference}>
                    {children}
                    <button onClick={close}>닫기</button>
                </dialog>,
                document.body
            )}
        </>
    );
};
