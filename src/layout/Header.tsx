import { Link } from "react-router";

export default function Header() {
    return (
        <>
            <div className="flex border-2">
                <Link to="/home" className="flex-initial border-2">
                    Home
                </Link>
            </div>
        </>
    );
}
