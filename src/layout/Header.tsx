import { Link } from "react-router";

export default function Header() {
    return (
        <>
            <nav className="flex flex-row border-2 justify-center items-center min-h-32">
                <Link
                    to="/home"
                    className="flex-initial border-2 text-3xl min-w-28 min-h-20 text-center align-middle"
                >
                    Home
                </Link>
                <Link
                    to="/Test"
                    className="flex-initial border-2 text-3xl min-w-28 min-h-20 text-center align-middle"
                >
                    Test
                </Link>
            </nav>
        </>
    );
}
