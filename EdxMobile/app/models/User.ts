export interface User {
    username: string;
    country: string;
    language: string;
    date_joined: string;
    profile_image: string;
    level_of_education: string;
    name: string;
    email: string;
}

export const emptyUser = (): User => ({
    username: "",
    country: "",
    language: "",
    date_joined: "",
    profile_image: "",
    level_of_education: "",
    name: "",
    email: ""
})