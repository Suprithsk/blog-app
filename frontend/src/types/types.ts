export interface Blog{
    id: number,
    title: string,
    content: string,
    publishedDate: string,
    userId: number,
    categoryId: number | null,
    user: User,
    comments: Comment[],
    upvotes: Upvote[],
    category: Category | null
}
export interface BlogResponse{
    id: number,
    title: string,
    content: string,
    publishedDate: string,
    userId: number,
    categoryId: number | null,
    user: UserResponse,
    comments: CommentUser[],
    upvotes: Upvote[],
    category: Category | null
}
interface CommentUser{
    id: number,
    content: string,
    userId: number,
    blogId: number,
    user: UserResponse
}
interface User{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string
}
interface Comment{
    id: number,
    content: string,
    userId: number,
    blogId: number
}
interface Upvote{
    id: number,
    userId: number,
    blogId: number
}
interface Category{
    id: number,
    name: string
}
export interface UserSignUp{
    name: string,
    username: string,
    email: string,
    password: string
}
export interface UserSignIn{
    username: string,
    password: string
}
export interface Categories{
    id: number,
    name: string
}
export interface UserResponse{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string
}