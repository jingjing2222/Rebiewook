import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center mt-40">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 100,
                    transition: { duration: 1, delay: 0.3 },
                }}
                className="flex-1 text-5xl mb-3"
            >
                안녕하세요
            </motion.div>
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{
                    x: 0,
                    opacity: 100,
                    transition: { duration: 1, delay: 1.3 },
                }}
                className="flex-1 text-3xl"
            >
                오신 것을 환영합니다!
            </motion.div>
            <br />
            <motion.div
                className="text-md text-stone-900 my-2"
                initial={{ x: -600, opacity: 0 }}
                animate={{
                    x: 0,
                    opacity: 100,
                    transition: { duration: 1, delay: 2.3 },
                }}
            >
                1. 인문, 세계문학전집 위주로 읽습니다.
            </motion.div>
            <motion.div
                className="text-md text-stone-900 my-2"
                initial={{ x: -600, opacity: 0 }}
                animate={{
                    x: 0,
                    opacity: 100,
                    transition: { duration: 1, delay: 2.8 },
                }}
            >
                2. 짧거나 성의가 안보이면 흥미가 없는 책일 수도..
            </motion.div>
            <motion.div
                className="text-md text-red-600 my-2"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 100,
                    transition: { duration: 1, delay: 3.8 },
                }}
            >
                ※ 스포일러가 포함될 수 있습니다.
            </motion.div>
            <motion.div
                className="flex items-center mt-2"
                initial={{ y: -5 }}
                animate={{
                    y: 0,
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                    },
                }}
            >
                <Button
                    className="flex-1"
                    onClick={() => navigate("/reviewlistpage")}
                >
                    살펴보기
                </Button>
            </motion.div>
        </div>
    );
};
