import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { ModalContext } from "@/components/Modal/ModalContext";

export default function Header() {
  const [cookies, , removeCookie] = useCookies(["username"]);
  const [isAdmin, setIsAdmin] = useState(cookies.username);
  const { openModal, setModal } = useContext(ModalContext);

  useEffect(() => {
    setIsAdmin(cookies.username);
  }, [cookies.username]);

  const openAuthModal = (type: "login" | "signup") => {
    openModal();
    setModal(type);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/75 backdrop-blur-lg">
      <div className="page-shell py-4">
        <div className="panel-surface flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white/80 text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-tight text-brand-gradient">Rebiewook</h1>
              <p className="text-xs text-muted-foreground">나는 생각한다, 나는 존재한다</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2 md:gap-3">
            <Link to="/" className="hidden sm:block">
              <Button variant="ghost" className="text-foreground/90">
                <BookOpen className="mr-1 h-4 w-4" />
                리뷰 목록
              </Button>
            </Link>

            {isAdmin && (
              <Link to="/upload">
                <Button variant="secondary" className="border border-border/70">
                  <PlusCircle className="mr-1 h-4 w-4" />
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
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => openAuthModal("login")}>
                  Login
                </Button>
                <Button onClick={() => openAuthModal("signup")}>Signup</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
