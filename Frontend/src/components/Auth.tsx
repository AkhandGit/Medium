import React from "react";
import toast from 'react-hot-toast';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { type SignupInput } from "@kuchbhimingwal/medium-common";
import { BACKEND_URL } from "../config";

interface AuthProps {
    type: "signin" | "signup";
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onSubmit }) => {
    const [ postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    }); 

    const navigate = useNavigate();

    function sendRequest() {
    axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup":"signin"}`, postInputs)
        .then(response => {
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            toast.success("Signup successful!");
            console.log("Signup successful:", response.data);
            navigate("/");
        })
        .catch(error => {
            toast.error("Signup failed!");
            console.error("Error during signup:", error);
        });
       
    }

    const isSignup = type === "signup";
    return (
        <div style={{ maxWidth: 400, width: "100%" }}>
            <h1 style={{ fontWeight: 700, fontSize: 40, marginBottom: 8 }}>
                {isSignup ? "Create an account" : "Sign in to your account"}
            </h1>
            <div style={{ color: "#6b7285", marginBottom: 32 }}>
                {isSignup ? (
                    <>
                        Already have an account?{" "}
                        <a href="/signin" style={{ color: "#111", textDecoration: "underline" }}>Login</a>
                    </>
                ) : (
                    <>
                        Don't have an account?{" "}
                        <a href="/signup" style={{ color: "#111", textDecoration: "underline" }}>Sign up</a>
                    </>
                )}
            </div>
            <form onSubmit={onSubmit}>
                {isSignup && (
                    <LabelledInput label = "Username" type = "text" placeholder="Enter UserName" onChange={
                    (e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        });
                    }
                }/>
                )}
                <LabelledInput label = "Email" type = "email" placeholder="Enter Email id" onChange={
                    (e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                    }
                }/>
                <LabelledInput label = "Password" type = "password" placeholder="oooooooooo" onChange={
                    (e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        });
                    }
                }/>
                <button 
                type="button" 
                onClick={sendRequest}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
                >
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>
            </form>
        </div>
    );
};


function LabelledInput({ label, type, placeholder, onChange }: { label: string; type: string; placeholder: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div>
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            <input type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder = {placeholder} 
            onChange={onChange}
            required />
        </div>
        </div>
    );
}