import { Blog } from "../types/types";
import { useNavigate } from "react-router-dom";
interface BlogCardProps {
  blog: Blog;
  isProfile: boolean;
  deleteBlog?: (id: number) => void;
}

const BlogCard = ({ blog, isProfile, deleteBlog }: BlogCardProps) => {
  const navigate = useNavigate()
  const formattedDate = new Date(blog.publishedDate).toLocaleDateString("en-US", {
    year: "numeric", // "2025"
    month: "long", // "February"
    day: "numeric", // "13"
  });
  const onBlogClickHandler = () => {
    navigate(`/blog/${blog.id}`)
  }
  return (
    <div className=" p-6 shadow-lg rounded-md flex-col bg-slate-300 mt-4 cursor-pointer" onClick={onBlogClickHandler}>
        <div className={`flex ${!isProfile && "justify-start"} ${isProfile && "justify-between"} items-center gap-2`}>
          <div className="flex items-center gap-2">
          <h3 className="uppercase font-semibold text-sm text-green-800">{formattedDate}</h3>
          <h2 className="text-sm uppercase font-semibold px-2 py-1 bg-green-500/50 text-green-800 rounded-md">{blog.category?.name?blog.category.name:"Uncategorized"}</h2>
          </div>
          {isProfile && <button className="text-sm text-white py-2 px-3 bg-red-500 rounded-md" onClick={(e) => {e.stopPropagation(); if(deleteBlog) deleteBlog(blog.id)}}>Delete</button>}
        </div>
        <h1 className="font-bold text-2xl mt-2">{blog.title}</h1>
        <p className="text-sm mt-1">{blog.content.length>50?blog.content.substring(0,50)+"...":blog.content}</p>
        <p className="text-base mt-1">{blog.user.name}</p>
    </div>
  )
}

export default BlogCard