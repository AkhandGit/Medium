import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface User {
    name: string;
    avatarUrl?: string;
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export const Post = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isPublishDisabled = title.trim() === "" && content.trim() === "";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }
        fetch(`${BACKEND_URL}/api/v1/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error fetching user info:", errorData);
                    throw new Error(errorData.error || "Failed to fetch user info");
                }
                return res.json();
            })
            .then(data => setUser({ name: data.name, avatarUrl: data.avatarUrl }))
            .catch(err => {
                console.log("Failed to fetch user info", err);
                navigate("/signin");
            });
    }, [navigate]);

    const handlePublish = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }
        setLoading(true);
        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            // Redirect to blogs or show success
            navigate("/");
        } catch (e) {
            console.error("Publish error:", e);
            alert("Failed to publish blog");
        } finally {
            setLoading(false);
        }
    };

    if (!user || loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <span className="text-xl text-gray-500">Loading...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 py-4 border-b">
                <div className="flex items-center gap-3">
                    <div onClick={() => navigate("/")} className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer select-none">
                        <span className="text-white text-2xl font-bold">●●</span>
                    </div>
                    <span className="font-medium text-gray-700">
                        Draft in {user.name}
                    </span>
                    <span className="text-gray-400 ml-2">Saved</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        disabled={isPublishDisabled}
                        onClick={handlePublish}
                        className={`px-5 py-1.5 rounded-full font-semibold transition
                            ${isPublishDisabled
                                ? "bg-green-100 cursor-not-allowed text-gray-500"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                    >
                        Publish
                    </button>
                    <button className="text-2xl text-gray-500">...</button>
                    <button>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-500">
                            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                            <circle cx="12" cy="20" r="1" />
                        </svg>
                    </button>
                    <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(user.name)}
                    </div>
                </div>
            </div>
            {/* Editor */}
            <div className="max-w-3xl mx-auto pt-16">
                <div className="flex items-center gap-4 mb-8">
                    <button className="w-12 h-12 border rounded-full flex items-center justify-center text-3xl text-gray-400 hover:bg-gray-100">
                        +
                    </button>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        className="text-5xl font-serif font-bold text-gray-800 outline-none border-none bg-transparent flex-1"
                    />
                </div>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full text-2xl font-serif text-gray-800 outline-none border-none bg-transparent resize-none min-h-[200px] mb-8"
                />
            </div>
        </div>
    );
}
