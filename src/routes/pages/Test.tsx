import { Link, Outlet, useParams } from "react-router";

export default function Test() {
    const testId = useParams<{ testId: string }>();
    return (
        <>
            <Outlet />
            <section className="grid grid-cols-3">
                {Object.keys(testId).length === 0 && (
                    <>
                        <Link
                            to="1"
                            className="grid text-center border-2 min-h-44"
                        >
                            1
                        </Link>
                        <Link
                            to="2"
                            className="grid text-center border-2 min-h-44"
                        >
                            2
                        </Link>
                        <Link
                            to="3"
                            className="grid text-center border-2 min-h-44"
                        >
                            3
                        </Link>
                        <Link
                            to="4"
                            className="grid text-center border-2 min-h-44"
                        >
                            4
                        </Link>
                    </>
                )}
            </section>
        </>
    );
}
