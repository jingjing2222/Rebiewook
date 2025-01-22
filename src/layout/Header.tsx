import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import Modal from "@/components/Modal/Modal";

export default function Header() {
    const [cookies, , removeCookie] = useCookies(["username"]);
    const [isAdmin, setIsAdmin] = useState(cookies.username);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setIsAdmin(cookies.username);
    }, [cookies.username]);

    const ValidateAdmin = () => {
        return (
            <>
                {isAdmin && (
                    <Link to="/upload">
                        <Button
                            variant="ghost"
                            className="text-white hover:text-[#F4A460] text-sm sm:text-base"
                        >
                            Upload Review
                        </Button>
                    </Link>
                )}
                {isAdmin ? (
                    <Button
                        onClick={() => {
                            removeCookie("username", { path: "/" });
                            setIsAdmin(false);
                        }}
                        className="bg-[#D2691E] hover:bg-[#A0522D] text-white text-sm sm:text-base"
                    >
                        Logout
                    </Button>
                ) : (
                    <Modal
                        type="Login"
                        title="login"
                        buttonColor="bg-[#D2691E] hover:bg-[#A0522D]"
                    />
                )}
            </>
        );
    };

    return (
        <header className="bg-[#8B4513] shadow-md wood-texture">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/">
                    <img
                        src="https://blogpfthumb-phinf.pstatic.net/MjAyNDEwMDdfMjMx/MDAxNzI4MjYzMTA0NzUw.FbYh7XyvweyOmyPdrRwVS7vNFcFFWpiLEULuMYoYCjwg.MV-ux-a41it77d4-HZaZp_7qdqWL5EZ29M8bqnwNH6Yg.JPEG/profileImage.jpg?type=w161"
                        alt="My Personal Book Report"
                        className={`opacity-100 cursor-pointer bg-[#F4A460] rounded transition-all w-40 h-40${
                            isHovered ? "opacity-80" : ""
                        }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </Link>
                <div className="text-xl md:text-3xl sm:text-2xl hidden sm:block">
                    나는 생각한다, 나는 존재한다
                </div>
                <nav className="flex flex-col sm:flex-row items-center space-x-4">
                    {<ValidateAdmin />}
                </nav>
            </div>
        </header>
    );
}
