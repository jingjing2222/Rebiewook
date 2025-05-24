import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export const SignupModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register, handleSubmit } = useForm();
    const submit = () => {
        closeModal();
    };
    return (
        <>
            <form>
                <Label htmlFor="name" className="text-[#8B4513]">
                    이름
                </Label>
                <Input
                    id="name"
                    {...register("name", { required: "이름은 필수입니다." })}
                    className="bg-white bg-opacity-70"
                />
                <Label htmlFor="username" className="text-[#8B4513]">
                    ID
                </Label>
                <Input
                    id="username"
                    {...register("username", {
                        required: "ID는 필수입니다.",
                        minLength: 3,
                        maxLength: 12,
                    })}
                    className="bg-white bg-opacity-70"
                />
                <Label htmlFor="password" className="text-[#8B4513]">
                    password
                </Label>
                <Input
                    id="password"
                    {...register("password", {
                        required: "password는 필수입니다.",
                        minLength: 3,
                        maxLength: 12,
                    })}
                    className="bg-white bg-opacity-70"
                />
                <Button className="mt-2" onClick={handleSubmit(submit)}>
                    제출
                </Button>
            </form>
        </>
    );
};
