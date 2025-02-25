import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllCategories } from "../apis/blogService";

interface TopBarProps {
    propSetSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    propSetCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
    propSetAdminUsername?: React.Dispatch<React.SetStateAction<string>>;
    propSetPage: React.Dispatch<React.SetStateAction<number>>;  
    searchTerm: string;
    adminUsername?: string;
    isProfile: boolean;
}
interface Category {
    id: number;
    name: string;
}
const TopBar = ({propSetPage, propSetSearchTerm, propSetCategoryId, propSetAdminUsername, searchTerm, adminUsername, isProfile}:TopBarProps) => {
    const [categories, setCategories]=useState<Category[]>([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories()
    }, [])
    const handleByCreator = () => {
        if(!propSetAdminUsername) return;
        propSetAdminUsername(adminUsername === "" ? "suprithsk" : "")
        propSetPage(1);
    }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        propSetCategoryId(selectedCategory === "All" ? null : parseInt(selectedCategory));
        propSetPage(1);
    }
    const searchTermChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        propSetSearchTerm(e.target.value);
    }
    return (
        <div className="flex justify-between items-center mt-4 flex-col md:flex-row">
            <div className="flex gap-4 flex-col md:flex-row md:w-auto w-full">
                <select className="border-2 border-gray-200 py-1 px-2 rounded-md" onChange={handleCategoryChange} > 
                    <option value={`All`}>All</option>
                    {categories.map((category: Category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                { !isProfile &&<div onClick={handleByCreator} className={`md:w-auto w-32 rounded-full text-sm px-4 py-1 text-white bg-slate-400  ${ adminUsername && adminUsername.length>0?"bg-slate-600":""} flex items-center cursor-pointer `}>
                    <p>By Creator</p>
                    {adminUsername && adminUsername.length>0 && <X className="w-5 h-5"/>}
                </div>}
            </div>
            <div className=" md:w-auto w-full mt-4 md:mt-0">
                <input type="text" placeholder="Search..." className="w-full border-2 border-gray-200 py-1 px-2 rounded-md" value={searchTerm} onChange={searchTermChangeHandler} />
            </div>
        </div>
    );
};

export default TopBar;
