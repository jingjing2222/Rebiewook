"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

export default function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [userInform, setUserInform] = useState({
        username: "",
        password: "",
    });
    const { register, handleSubmit } = useForm();
    const [, setCookie] = useCookies(["username"]); // 쿠키 훅

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(
            "Login attempted with:",
            userInform.username,
            userInform.password
        );
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#D2691E] hover:bg-[#A0522D] text-white">
                    주인장 로그인
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F4A460] bg-opacity-90">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#8B4513]">
                        주인장 로그인
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-[#8B4513]">
                            Username
                        </Label>
                        <Input
                            id="username"
                            {...register("username")}
                            className="bg-white bg-opacity-70"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#8B4513]">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="bg-white bg-opacity-70"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
                        onClick={handleSubmit((data) =>
                            setUserInform(() => {
                                setCookie("username", data.username, {
                                    path: "/",
                                }); // 쿠키에 토큰 저장
                                setIsOpen(false);
                                return data;
                            })
                        )}
                    >
                        Login
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
