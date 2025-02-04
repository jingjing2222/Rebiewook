import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export const SignupModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register } = useForm();
    const submit = () => {
        closeModal();
    };
    return (
        <>
            <form>
                <input placeholder="ID" {...register("id")} />
                <input placeholder="password" {...register("password")} />
                <Button onClick={submit}></Button>
            </form>
        </>
    );
};
