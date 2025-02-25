import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import { Blog } from "../types/types"
import { get10BlogsByCreator } from "../apis/blogService"

const Cards = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const fetchBlogs = async () => {
        try {
            const response = await get10BlogsByCreator("suprithsk")
            console.log(response)
            setBlogs(response)
        } catch (error) {
            setBlogs([])
            console.error(error)
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [])
    useEffect(() => {
        console.log(blogs)
    }, [blogs])
    return (
        <div className="flex justify-center items-center mt-4">
            <div className="w-[90%] md:w-[60%]">
                {blogs.length>0 && <h1 className="font-semibold ">Blogs by creator: (Suprith S K)</h1>}
                {blogs.map((blog: Blog)=>(
                    <BlogCard key={blog.id} blog={blog} isProfile={false} />
                ))}
                {/* CARDS */}
            </div>
        </div>
    )
}

export default Cards