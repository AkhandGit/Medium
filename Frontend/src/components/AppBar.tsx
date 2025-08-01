import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
    const navigate = useNavigate();
    return (
        <div className="border-b bg-white shadow select-none">
            <div className="flex items-center justify-between max-w-7xl mx-auto py-3 px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <span onClick={() => navigate("/")} className="text-3xl font-serif font-bold tracking-tight cursor-pointer select-none">Medium</span>
                </div>
                {/* Search */}
                <div className="flex-1 flex justify-center mx-8">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none w-full text-gray-700"
                        />
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-6 cursor-pointer">
                    <button
                        onClick={() => navigate("/post")}
                        className="flex items-center gap-1 text-gray-700 hover:text-black cursor-pointer"
                    >
                        <TfiWrite />
                        <span>Write</span>
                    </button>
                    <button>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-gray-700 hover:text-black">
                            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                            <circle cx="12" cy="20" r="1" />
                        </svg>
                    </button>
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border"
                    />
                </div>
            </div>
        </div>
    );
}
