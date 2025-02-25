import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import { register } from "../apis/authService";
import { UserSignUp } from "../types/types";
import Header from "../components/Header";

const SignUp = () => {
    const navigate= useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        return () => {
            toast.remove();
        };
    }, []);
    const submitHandler1 = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!username || !email || !password){
            toast.error('Please fill all fields');
            return;
        }
        try{
            await toast.promise(
                handleSubmit({username,password,email, name}),
                {
                    loading:'Signing up...',
                    success:'Signup in successfully',
                    error:(e)=>{
                        console.error('err',e);
                        if(e.message){
                            return e.message;
                        }
                        return 'An error occurred'
                    }
                }
            )
        }catch(error){
            console.error('Error signing up:',error);
        }
    }
    const handleSubmit = async (userInfo: UserSignUp) => {
        try {
            const response = await register(userInfo);

            console.log(response);
            navigate('/signin');
        } catch (e) {
            console.error('Error signing up:', e);
            throw e;
        }
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <>
            <Toaster />
            <Header />
        <div className="flex justify-center items-center h-screen">
            <div className="w-[90%] md:w-[40%] bg-slate-300 p-8 rounded-md shadow-lg">
                <h1 className="font-semibold text-2xl">Sign Up</h1>
                <form className="mt-4">
                    <div className="flex flex-col mt-4">
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
                        <label htmlFor="name" className="text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border-2 border-gray-200 p-2 rounded-md"
                            onChange={handleNameChange}
                            value={name}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border-2 border-gray-200 p-2 rounded-md"
                            onChange={handleEmailChange}
                            value={email}
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
                    <button className="mt-4 bg-slate-950 text-white py-2 px-4 rounded-md" onClick={submitHandler1}>
                        Sign Up
                    </button>
                    <div className="mt-4 flex justify-center">
                        <span className="text-sm">Already have an account? <Link to="/signin" className="text-blue-500 underline">Sign In</Link></span>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default SignUp;
