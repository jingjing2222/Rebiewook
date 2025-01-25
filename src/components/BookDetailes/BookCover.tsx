export const BookCover = ({
    coverImage,
    title,
}: {
    coverImage: string;
    title: string;
}) => {
    return (
        <>
            <div className="flex justify-center md:w-1/3 mb-6 md:mb-0">
                <img
                    src={coverImage || "/placeholder.svg"}
                    alt={`Cover of ${title}`}
                    className="w-6/12 md:h-6/12 rounded-lg shadow-lg"
                />
            </div>
        </>
    );
};
