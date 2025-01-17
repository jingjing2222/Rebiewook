import { Link, Outlet, useParams } from "react-router";

const linkTest = ["1", "2", "3", "4"];

type testIdType = {
    testId: string;
};

export default function Test() {
    const testId = useParams<testIdType>();
    return (
        <>
            <h2 className="text-6xl text-center py-4">Test</h2>
            <Outlet />
            <section className="grid grid-cols-5">
                {Object.keys(testId).length === 0 && (
                    <>
                        {linkTest.map((links: string) => (
                            <Link
                                to={links}
                                className="grid text-center border-2 min-h-44 text-3xl"
                            >
                                {`test${links}`}
                            </Link>
                        ))}
                    </>
                )}
            </section>
        </>
    );
}
