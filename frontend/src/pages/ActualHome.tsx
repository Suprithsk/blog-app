import ActualHeader from "../components/ActualHeader"
import TopBar from "../components/TopBar"
import { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import { Blog } from "../types/types"
import Pagination from "../components/Pagination"
import { getBlogs } from "../apis/blogService"
import { useNavigate } from "react-router-dom"
import { HashLoader } from "react-spinners";
const ActualHome = () => {
    const navigate = useNavigate()
    if(!localStorage.getItem("token")){
        navigate('/signin')
    }
    const [pageSize, setPageSize]=useState(10)
    const [page, setPage]=useState(1)
    const [searchTerm, setSearchTerm]=useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm]=useState("")
    const [categoryId, setCategoryId]=useState<number | null>(null)
    const [adminUsername, setAdminUsername]=useState("")
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
        console.log(page, pageSize, debouncedSearchTerm, categoryId, adminUsername)    
        try {
            setIsLoading(true)
            const response=await getBlogs(page, pageSize, debouncedSearchTerm, categoryId, adminUsername)
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
    }, [page, pageSize, debouncedSearchTerm, categoryId, adminUsername])
    useEffect(() => {
        console.log(blogs)
    }, [blogs])
    return (
        <div className="bg-amber-50">
            <ActualHeader />
            <div className="w-[90%] md:w-[60%] mx-auto">
                <TopBar isProfile={false} propSetSearchTerm={setSearchTerm} searchTerm={searchTerm} adminUsername={adminUsername} propSetCategoryId={setCategoryId} propSetAdminUsername={setAdminUsername} propSetPage={setPage}/>
                {isLoading && <HashLoader color="rgb(59 130 246)" className="mx-auto mt-10" />}
                {blogs.length===0 && !isLoading && <p className="text-center text-2xl font-bold">No blogs found!</p>}
                {!isLoading && blogs.map((blog: Blog) => (
                    <BlogCard key={blog.id} blog={blog} isProfile={false}/>
                ))}
                <Pagination propSetPageSize={setPageSize} propSetPage={setPage} page={page} pageSize={pageSize} totalPages={totalPages} />
            </div>
        </div>
    )
}

export default ActualHome