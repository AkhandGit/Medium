import { useState, type ChangeEvent} from "react";
import { Link, useNavigate } from "react-router-dom";

import type { SignupInput } from '@akhandnpm/medium-common';
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth =({type}: {type: "signup" |"signin"}) => {
    const navigate= useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })


    async function sendRequest() {
        try {
            const response= await  axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt= response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");

        }
        catch(e) {

            //alert the user that the page request failed
            alert("Request failed. Please try again.");
            console.error(e);
        }
    }


    return <div>
            <div className="h-screen  flex justify-center flex-col">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="font-bold text-4xl">
                                {type==="signin"?"Login":"Create an Account"} 
                            </div>
                            <div className="text-slate-400" mt-2>
                                {type==="signin"?"Don't have an account?":"Already have an account?"} 
                                <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>{type==="signin"?"Sign up":"Sign in"}</Link>
                            </div>
                        </div>

                        <div className="pt-6">

                            {type==="signup"?<LabelledInput label="Name" placeholder="Enter Name" onChange={(e)=>{
                            setPostInputs(c => ({ 
                                ...postInputs,
                                name: e.target.value }))
                            }} />:null}
                            <LabelledInput label="Username" placeholder="Enter Username" onChange={(e)=>{
                                setPostInputs(c => ({ 
                                    ...postInputs, 
                                    username: e.target.value }))
                            }} />
                            <LabelledInput label="Password" type={"password"} placeholder="Enter Password" onChange={(e)=>{
                                setPostInputs(c => ({ 
                                    ...postInputs,
                                    password: e.target.value }))
                            }} />
                            <button onClick={sendRequest} type="button" className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                             focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
                              dark:border-gray-700">{type === "signup" ? "Sign Up": "Sign In" }</button>


                        </div>


                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string; 
}


function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return <div>
            <div>
                <label className="block mb-2 text-sm font-bold text-black pt-3">{label}</label>
                <input onChange={onChange} type={type || "text" } id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
}