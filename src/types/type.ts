export interface Review {
    author: string;
    coverImage: string;
    description: string;
    detailedReview: string;
    id: number;
    publishedDate: string;
    title: string;
}

export interface DBBook {
    author: string;
    cover_image: string;
    description: string;
    detailed_review: string;
    published_date: string;
    title: string;
}

export interface SearchedBook {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
}

export interface UserInform {
    username: string;
    password: string;
}
