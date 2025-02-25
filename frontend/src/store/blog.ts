import { create } from "zustand";
import { Blog } from "../types/types";

const blogs: Blog[]=[
    {
        "id": 2,
        "title": "My Second Blog",
        "content": "This is the content of my second blog.",
        "publishedDate": "2025-02-13T10:56:28.408Z",
        "userId": 1,
        "categoryId": 1,
        "user": {
            "id": 1,
            "name": "New User",
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "$2a$10$oviB5ELT1l6eiZuNGFtEtOmBR/.f3djSvbSmAeFr97YBG4wfE2v1."
        },
        "comments": [],
        "upvotes": [],
        "category": {
            "id": 1,
            "name": "react"
        }
    },
    {
        "id": 1,
        "title": "My First Blog",
        "content": "This is the content of my first blog.",
        "publishedDate": "2025-02-13T10:36:36.567Z",
        "userId": 1,
        "categoryId": null,
        "user": {
            "id": 1,
            "name": "New User",
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "$2a$10$oviB5ELT1l6eiZuNGFtEtOmBR/.f3djSvbSmAeFr97YBG4wfE2v1."
        },
        "comments": [
            {
                "id": 1,
                "content": "nice blog!",
                "userId": 1,
                "blogId": 1
            }
        ],
        "upvotes": [],
        "category": null
    },
    {
        "id": 3,
        "title": "My First Blog",
        "content": "This is the content of my first blog.",
        "publishedDate": "2025-02-13T10:36:36.567Z",
        "userId": 1,
        "categoryId": null,
        "user": {
            "id": 1,
            "name": "New User",
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "$2a$10$oviB5ELT1l6eiZuNGFtEtOmBR/.f3djSvbSmAeFr97YBG4wfE2v1."
        },
        "comments": [
            {
                "id": 1,
                "content": "nice blog!",
                "userId": 1,
                "blogId": 1
            }
        ],
        "upvotes": [],
        "category": null
    }
]
interface BlogStore {
    blogs: Blog[],
    fetchBlogs: (page: number, categoryId: number, pageSize: number) => void
}
export const useBlogs = create<BlogStore>((set) => ({ 
    blogs: [],

    fetchBlogs: async (page: number, categoryId: number, pageSize: number) => {
        set({ blogs: blogs })
    },
}));