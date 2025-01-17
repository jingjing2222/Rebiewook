import Test1 from "@/components/test/Test1";
import { Link, useParams } from "react-router";

export default function TestDetail() {
    const { testId } = useParams<{ testId: string }>(); // testId 값을 가져옴

    function LoadTest() {
        switch (testId) {
            case "1":
                return <Test1 />;
        }
    }
    return (
        <>
            <main className="flex flex-col">
                <div className="text-8xl min-w-48 min-h-48 border-2 text-center item-center">
                    <LoadTest />
                </div>
                <Link to="/Test"> 뒤로가기 </Link>
            </main>
        </>
    );
}
