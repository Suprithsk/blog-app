import TopBar from "./TopBar"
import BlogCard from "./BlogCard"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import { getBlogsOfUser, deleteBlogById } from "../apis/blogService"
import { Blog } from "../types/types"
import { HashLoader } from "react-spinners"

const PersonalBlogs = () => {
    const [pageSize, setPageSize]=useState(10)
    const [page, setPage]=useState(1)
    const [searchTerm, setSearchTerm]=useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm]=useState("")
    const [categoryId, setCategoryId]=useState<number | null>(null)
    const [totalPages, setTotalPages]=useState(0)
    const [isLoading, setIsLoading]=useState(true)
    const [blogs, setBlogs]=useState<Blog[]>([])
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])
    const fetchBlogs=async () => {
        console.log(page, pageSize, debouncedSearchTerm, categoryId)    
        try {
            setIsLoading(true)
            const response=await getBlogsOfUser(page, pageSize, debouncedSearchTerm, categoryId)
            console.log(response)
            setBlogs(response.data)
            setTotalPages(response.pagination.totalPages)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchBlogs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, debouncedSearchTerm, categoryId])
    useEffect(() => {
        console.log(blogs)
    }, [blogs])
    const deleteBlog = async (id: number) => {
        try {
            const res=await deleteBlogById(id)
            console.log(res)
            fetchBlogs()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="mt-4">
            <h1 className="text-3xl font-semibold">Blogs:</h1>
            <div className="mt-3">
            <TopBar isProfile={true} propSetSearchTerm={setSearchTerm} searchTerm={searchTerm}  propSetCategoryId={setCategoryId}  propSetPage={setPage}/>
                {isLoading && <HashLoader color="rgb(59 130 246)" className="mx-auto mt-10" />}
                {blogs.length===0 && !isLoading && <p className="text-center text-2xl font-bold">No blogs found!</p>}
                {!isLoading && blogs.map((blog: Blog) => (
                    <BlogCard key={blog.id} blog={blog} deleteBlog ={deleteBlog} isProfile={true}/>
                ))}
            <Pagination propSetPageSize={setPageSize} propSetPage={setPage} page={page} pageSize={pageSize} totalPages={totalPages} />
            </div>
            
        </div>
    )
}

export default PersonalBlogs