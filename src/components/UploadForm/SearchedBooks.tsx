interface SearchedBook {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
}
interface SearchedBookProps {
    onClick: (book: SearchedBook) => void;
    book: SearchedBook;
    virtual?;
}

export default function SearchedBooks({
    onClick,
    book,
    virtual,
}: SearchedBookProps) {
    return (
        <li
            className="h-32 absolute w-full"
            style={{ transform: `translateY(${virtual.start}px)` }}
            onClick={() => onClick(book)}
        >
            <div className="flex items-center p-4 bg-[#F4A460] bg-opacity-20 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-opacity-30 cursor-pointer wood-texture">
                <div className="flex-shrink-0 w-16 h-24 mr-4 overflow-hidden rounded-md shadow-sm">
                    {book.thumbnail ? (
                        <img
                            className="w-full h-full object-cover"
                            src={book.thumbnail || "/placeholder.svg"}
                            alt={`Cover of ${book.title}`}
                        />
                    ) : (
                        <div className="w-full h-full bg-[#DEB887] flex items-center justify-center text-[#8B4513]">
                            이미지가 없습니다.
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-1 line-clamp-1">
                        {book.title}
                    </h3>
                    {book.authors && book.authors.length > 0 && (
                        <p className="text-[#A0522D] text-sm mb-2">
                            by {book.authors[0]}
                        </p>
                    )}
                </div>
            </div>
        </li>
    );
}

//mb-4 last:mb-0
