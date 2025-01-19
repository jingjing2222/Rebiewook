import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/LoginModal";

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = () => {
        setIsAdmin(false);
    };

    return (
        <header className="bg-[#8B4513] shadow-md wood-texture">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/">
                    <img
                        src="https://blogpfthumb-phinf.pstatic.net/MjAyNDEwMDdfMjMx/MDAxNzI4MjYzMTA0NzUw.FbYh7XyvweyOmyPdrRwVS7vNFcFFWpiLEULuMYoYCjwg.MV-ux-a41it77d4-HZaZp_7qdqWL5EZ29M8bqnwNH6Yg.JPEG/profileImage.jpg?type=w161"
                        alt="My Personal Book Report"
                        width={200}
                        height={50}
                        className={`cursor-pointer bg-[#F4A460] rounded transition-all ${
                            isHovered ? "opacity-80" : ""
                        }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </Link>
                <h2 className="text-3xl">나는 생각한다, 나는 존재한다</h2>
                <nav className="flex items-center space-x-4">
                    {isAdmin && (
                        <Link to="/upload">
                            <Button
                                variant="ghost"
                                className="text-white hover:text-[#F4A460]"
                            >
                                Upload Review
                            </Button>
                        </Link>
                    )}
                    {isAdmin ? (
                        <Button
                            onClick={handleLogout}
                            className="bg-[#D2691E] hover:bg-[#A0522D] text-white"
                        >
                            Logout
                        </Button>
                    ) : (
                        <LoginModal />
                    )}
                </nav>
            </div>
        </header>
    );
}
