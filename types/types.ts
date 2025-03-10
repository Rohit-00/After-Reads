export type UserCred = {
    email: string;
    password: string;
}

export type Books = {
    id: number;
    volumeInfo: {
        title: string;
        authors: string;
        description: string;
        imageLinks: {
        thumbnail: string;
        };
    };
}