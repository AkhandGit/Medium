import { PacmanLoader } from "react-spinners";
import { AppBar } from "../components/AppBar";
import { useBlog } from "../hooks/index";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useBlog({ id: id || "" });
    if (!id) {
        return (
            <div>
                <AppBar />
                <div className="max-w-3xl mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
                </div>
            </div>
        );
    }


    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <PacmanLoader />
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <AppBar />
                <div className="max-w-3xl mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="max-w-5xl mx-auto py-12 px-4 md:px-0 flex flex-col md:flex-row gap-12">
                {/* Blog Content */}
                <div className="flex-1">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">{blog.title}</h1>
                    <div className="text-gray-500 text-lg mb-6">
                        Posted on {blog.publishedDate || "August 24, 2023"}
                    </div>
                    <div className="text-gray-700 text-xl mb-8">
                        {blog.content}
                    </div>
                    {/* Comments section placeholder */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-2">Comments</h2>
                        <div className="text-gray-400">No comments yet.</div>
                    </div>
                </div>
                {/* Author Info */}
                <div className="w-full md:w-72 flex-shrink-0">
                    <div className="mb-8">
                        <div className="text-gray-500 mb-2">Author</div>
                        <div className="flex items-center gap-3">
                            <img
                                src={blog.authorAvatarUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
                                alt={blog.author.name}
                                className="w-12 h-12 rounded-full bg-gray-200"
                            />
                            <div>
                                <div className="font-bold text-xl">{blog.author.name}</div>
                                <div className="text-gray-500 text-sm">
                                    Master of the Universe
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 mb-2">About the Author</div>
                        <div className="text-gray-700 text-sm">
                            {/* {blog.author.bio || "No bio available."} */}
                            "No Bio Available"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}