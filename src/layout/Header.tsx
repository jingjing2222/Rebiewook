import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { ModalContext } from "@/components/Modal/ModalContext";

export default function Header() {
  const [cookies, , removeCookie] = useCookies(["username"]);
  const [isAdmin, setIsAdmin] = useState(cookies.username);
  const [isHovered, setIsHovered] = useState(false);
  const { openModal, setModal } = useContext(ModalContext);

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
          <div className="flex gap-4">
            <Button
              className="bg-[#D2691E] hover:bg-[#A0522D]"
              onClick={() => {
                openModal();
                setModal("login");
              }}
            >
              Login
            </Button>
            <Button
              className="bg-[#D2691E] hover:bg-[#A0522D]"
              onClick={() => {
                openModal();
                setModal("signup");
              }}
            >
              Signup
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <header className="bg-[#8B4513] shadow-md wood-texture sticky">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img
            src="https://i.ibb.co/7Ry0jpw/001-2.png"
            alt="My Personal Book Report"
            className={`opacity-100 cursor-pointer rounded transition-all w-28 h-auto md:w-40 md:h-auto${
              isHovered ? "opacity-80" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Link>
        <div className="text-sm md:text-2xl sm:text-lg hidden sm:block">
          나는 생각한다, 나는 존재한다
        </div>
        <nav className="flex flex-col sm:flex-row items-center space-x-4">
          {<ValidateAdmin />}
        </nav>
      </div>
    </header>
  );
}
