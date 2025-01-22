import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

interface UserInform {
    username: string;
    password: string;
}

export const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register, handleSubmit } = useForm<UserInform>();
    const [, setCookie] = useCookies(["username"]);

    const handleLogin = (data: UserInform, closeModal: () => void) => {
        console.log("Login attempted with:", data.username, data.password);
        setCookie("username", data.username, { path: "/" });
        closeModal();
    };

    return (
        <>
            <form
                className="space-y-4"
                onSubmit={handleSubmit((userInform) => {
                    handleLogin(userInform, closeModal);
                })}
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
            </form>
        </>
    );
};
