import ActualHeader from "../components/ActualHeader"
import { getAllCategories, addBlog } from "../apis/blogService"
import { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
interface Category {
    id: number
    name: string
}
const AddBlog = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [categories, setCategories] = useState<Category[]>([])
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories()
            setCategories(response)
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const addBlogHandler = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            if(!title || !content){
                toast.error('Please fill all fields')
                return;
            }
            const response = await addBlog(title, content, category === "" ? null : parseInt(category))
            console.log(response)
            navigate("/home")
        } catch (error) {
            console.error("Error adding blog:", error)
        }
    }
  return (
    <div>
        <ActualHeader />
        <Toaster />
        <div className="w-[90%] md:w-[60%] mx-auto mt-4">
            <h1 className="text-3xl font-semibold">Add Blog</h1>
            <div className="flex flex-col gap-4 mt-4">
            <input
                type="text"
                placeholder="Title"
                className="border-2 border-gray-200 py-1 px-2 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select
                name=""
                id=""
                className="border-2 border-gray-200 py-1 px-2 rounded-md "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Uncategorised</option>
                {categories.map((category:Category) => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <textarea
                className="w-full border-2 border-gray-200 py-1 px-2 rounded-md"
                rows={10}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            
            <div className="flex">
                <button className="bg-blue-500 px-4 py-2 rounded-md mt-2 text-white" onClick={addBlogHandler}>
                    Submit
                </button>
                <button className="bg-slate-300 px-4 py-2 rounded-md mt-2 ml-2" onClick={() => navigate('/home')}>
                    Cancel
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddBlog