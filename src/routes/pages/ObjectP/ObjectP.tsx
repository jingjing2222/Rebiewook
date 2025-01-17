import { Link } from "react-router";

const linkTest: string[] = ["1", "2", "3", "4"];

export default function ObjectP() {
    return (
        <>
            <h2 className="text-6xl text-center py-4">ObjectP</h2>
            <section className="grid grid-cols-5">
                {linkTest.map((links: string) => (
                    <Link
                        key={links}
                        to={`/objectp/${links}`}
                        className="grid text-center border-2 min-h-44 text-3xl"
                    >
                        {`ObjectP${links}`}
                    </Link>
                ))}
            </section>
        </>
    );
}
