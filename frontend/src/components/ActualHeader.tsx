import { Pencil, LogOut, House, AlignJustify, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActualHeader = () => {
    const navigate= useNavigate()
    const handleHomeClick = () => {
        navigate('/')
    }
    const handleHomeActualClick = () => {
        navigate('/home')
    }
    const handleWriteClick = () => {
        navigate('/addblog')
    }
    const handleProfileClick = () => {
        navigate('/profile')
    }
    const handleLogoutClick = () => {
        localStorage.removeItem("token")
        navigate('/signin')
    }
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
        <header className="sticky top-0 w-full md:py-6 md:px-20 py-6 px-10 bg-amber-50 z-10 flex justify-between items-center border-b-2 ">
            <h1 className="cursor-pointer text-2xl font-semibold" onClick={handleHomeClick}>Medium</h1>
            <div className="md:flex gap-4 hidden">
                <button className="bg-slate-300 p-2 rounded-full" onClick={handleHomeActualClick}>
                    <House />
                </button>
                <button className="rounded-full bg-slate-300 p-2" onClick={handleWriteClick}>
                  <Pencil />
                </button>
                <button className="rounded-full bg-slate-300 p-2" onClick={handleProfileClick}>
                    <User />
                </button>
                <button className="bg-slate-300 p-2 rounded-full" onClick={handleLogoutClick}>
                    <LogOut />
                </button>
            </div>
            <div className="md:hidden cursor-pointer" onClick={handleToggle}>
              <AlignJustify />
            </div>
            {toggle && <div className="absolute top-16 right-10 bg-white shadow-lg p-4 rounded-md md:hidden">
                <p onClick={handleHomeClick}>Home</p>
                <p onClick={handleWriteClick}>Write</p>
                <p onClick={handleProfileClick}>Profile</p>
                <p onClick={handleLogoutClick}>Logout</p>
            </div>}
        </header>
    );
};

export default ActualHeader;
