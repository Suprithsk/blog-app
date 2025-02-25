import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { login } from "../apis/authService";
import { UserSignIn } from "../types/types";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SignIn = () => { 
    const navigate= useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        return () => {
            toast.remove();
        };
    }, []);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            await toast.promise(handleSubmit({ username, password }), {
                loading: "Signing in...",
                success: "Signin successfully",
                error: (e) => {
                    console.error("err", e);
                    if (e.message) {
                        return e.message;
                    }
                    return "An error occurred";
                },
            });
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };
    const handleSubmit = async (credentials: UserSignIn) => {
        try {
            const response = await login(credentials);
            console.log(response);
            localStorage.setItem("token", response.token);
            navigate("/home");
        } catch (e) {
            console.error("Error signing in:", e);
            throw e;
        }
    };
    return (
        <>
            <Toaster />
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="w-[90%] md:w-[40%] bg-slate-300 p-8 rounded-md shadow-lg">
                    <h1 className="font-semibold text-2xl">Sign In</h1>
                    <form className="mt-4">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="border-2 border-gray-200 p-2 rounded-md"
                                onChange={handleUsernameChange}
                                value={username}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="border-2 border-gray-200 p-2 rounded-md"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                        </div>
                        <button
                            className="mt-4 bg-slate-950 text-white py-2 px-4 rounded-md"
                            onClick={submitHandler}
                        >
                            Sign In
                        </button>
                        <div className="mt-4 flex justify-center">
                            <span className="text-sm">
                                New User?{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-500 underline"
                                >
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
