import ActualHeader from "../components/ActualHeader";
import { ArrowBigLeft } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, addCommentToBlog } from "../apis/blogService";
import { BlogResponse } from "../types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import Color from "@tiptap/extension-color";

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({}),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];
const Blog = () => {
    const editor = useEditor({
        extensions,
        content:"",
        editorProps: {
            attributes: {
                class: "bg-white p-4 mt-4 rounded-md shadow-md prose prose-slate max-w-none border-2 border-slate-200",
            },
        },
    });
    const navigate= useNavigate();
    const [blog, setBlog] = useState<BlogResponse | null>(null);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    console.log("token",token);
    useEffect(() => {
        console.log(id);
    }, [id]);
    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            const response = await getBlogById(parseInt(id!));
            console.log(response);
            setBlog(response);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching blog:", error);
        }
    };
    const getDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            year: "numeric", // "2025"
            month: "long", // "February"
            day: "numeric", // "13"
        });
        return formattedDate;
    };
    const backClickHandler = () => {
        navigate(-1);
    };
    const addComment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!comment) {
                return;
            }
            const response = await addCommentToBlog(parseInt(id!), comment);
            console.log(response);
            setComment("");
            fetchBlog();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    useEffect(() => {
        fetchBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="bg-amber-50">
            <ActualHeader />
            {
                isLoading && <HashLoader color="rgb(59 130 246)" className="mx-auto mt-10" />
            }
            {blog && !isLoading &&  <div className="w-[90%] md:w-[60%] mx-auto">
                <button className="flex items-center mt-4 rounded-md bg-slate-300 p-2" onClick={backClickHandler}>
                    <ArrowBigLeft />
                    <p className="text-sm" >Back</p>
                </button>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">
                            {blog && blog.title}
                        </h1>
                        <h2 className="text-sm uppercase font-semibold px-2 py-1 bg-green-500/50 text-green-800 rounded-md">
                            {blog && blog.category?.name
                                ? blog.category.name
                                : "Uncategorized"}
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <p className="text-sm text-slate-500">
                            {blog && getDate(blog.publishedDate)}
                        </p>
                        <p className="text-sm text-slate-500">
                            {blog && blog.user.name}
                        </p>
                    </div>
                    <p className="text-sm text-slate-700 text-justify">
                        {blog && blog.content}
                    </p>
                </div>
                {token && <div className="flex flex-col mt-4">
                    <p>Comment</p>
                    <textarea
                        className="w-full border-2 border-gray-200 py-1 px-2 rounded-md resize-none"
                        rows={3}
                        placeholder="Type here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                        <button
                            className="bg-slate-300 px-4 py-2 rounded-md mt-2"
                            onClick={addComment}
                        >
                            Submit
                        </button>
                    </div>
                </div>}
                {<div className="mt-4">
                    <p className="text-sm text-slate-500">Comments</p>
                    <div className="flex flex-col gap-2 mt-2">
                        {blog && blog.comments.length === 0 && (
                            <p className="text-sm text-slate-500">No comments!</p>
                        )}
                        {blog &&
                            blog.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex flex-col gap-2 bg-slate-300 p-2 rounded-md"
                                >
                                    <p className="text-sm text-slate-700">
                                        {comment.content}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                        <p className="text-sm text-slate-500">
                                            {comment.user.username}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>}
            </div>}
        </div>
    );
};

export default Blog;
