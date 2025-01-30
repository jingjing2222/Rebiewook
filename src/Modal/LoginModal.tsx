import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase/Client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

interface UserInform {
    username: string;
    password: string;
    id?: number;
}

export const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register, handleSubmit } = useForm<UserInform>();
    const [, setCookie] = useCookies(["username"]);
    const [correct, setCorrect] = useState<boolean | null>();

    async function handleLogin(inputValue: UserInform) {
        const { data: user, error } = await supabase.from("user").select("*");

        if (error) console.error(error);
        if (
            user![0].username === inputValue.username &&
            user![0].password === inputValue.password
        ) {
            setCookie("username", inputValue.username, { path: "/" });
            closeModal();
        } else setCorrect(true);
    }

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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
                {correct === true && (
                    <div className="text-center text-red-500">
                        관리자가 아닙니다!
                    </div>
                )}
            </form>
        </>
    );
};
