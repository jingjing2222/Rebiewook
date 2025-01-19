export default function Footer() {
    return (
        <footer className="bg-[#8B4513] text-white py-6 wood-texture">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                            책 한권만 읽은 자의 용감한 독후감
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 text-center md:text-right">
                        <p>
                            &copy; 2023 My Personal Book Report. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
