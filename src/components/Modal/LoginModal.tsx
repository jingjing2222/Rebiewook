import BaseModal from "@/components/Modal/BaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

interface UserInform {
    username: string;
    password: string;
}

export const LoginModal = () => {
    const { register, handleSubmit } = useForm<UserInform>();
    const [, setCookie] = useCookies(["username"]); // 쿠키 훅

    const handleLogin = (data: UserInform, closeModal: () => void) => {
        console.log("Login attempted with:", data.username, data.password);
        setCookie("username", data.username, { path: "/" });
        closeModal();
    };

    return (
        <BaseModal
            title="Login"
            handleClick={handleSubmit(handleLogin)}
            buttonColor="bg-[#D2691E] hover:bg-[#A0522D]"
        >
            <div className="space-y-2">
                <Label htmlFor="username" className="text-[#8B4513]">
                    Username
                </Label>
                <Input
                    id="username"
                    {...register("username", { required: true })}
                    className="bg-white bg-opacity-70"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-[#8B4513]">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className="bg-white bg-opacity-70"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
                로그인
            </Button>
        </BaseModal>
    );
};
