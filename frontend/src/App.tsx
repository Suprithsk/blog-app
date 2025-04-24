import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ActualHome from "./pages/ActualHome";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";
import Profile from "./pages/Profile";
import TipTapEditor from "./external/TipTap";
function App() {
    return (
        <section className="relative font-poppins bg-amber-50 min-h-screen w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<ActualHome />} />
                    <Route path="/blog/:id" element={<Blog />} />
                    <Route path="/addblog" element={<AddBlog />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tiptap" element={<TipTapEditor />} />
                </Routes>
                
            </BrowserRouter>
            
        </section>
    );
}

export default App;
