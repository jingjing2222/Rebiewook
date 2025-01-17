import { Link } from "react-router";

const linkArray = ["home", "Test", "objectp"];

export default function Header() {
    return (
        <>
            <nav className="flex flex-row border-2 justify-center items-center min-h-32">
                {linkArray.map((linkWhere) => {
                    const links = `/${linkWhere}`;
                    return (
                        <Link
                            to={links}
                            className="flex-initial border-2 text-3xl min-w-28 min-h-20 text-center align-middle"
                        >
                            {linkWhere}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
