export const BookCover = ({
    coverImage,
    title,
}: {
    coverImage: string;
    title: string;
}) => {
    return (
        <>
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                <img
                    src={coverImage || "/placeholder.svg"}
                    alt={`Cover of ${title}`}
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>
        </>
    );
};
