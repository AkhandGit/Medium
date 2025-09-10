import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

/*
export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 "> <PacmanLoader /> </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="max-w-3xl mx-auto py-8">
                <div className="space-y-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key = {blog.id}
                            id = {blog.id}
                            authorName={blog.author.name}
                            publishedDate={blog.publishedDate || "Sep 22, 2024"}
                            title={blog.title}
                            content={blog.content}
                            authorAvatarUrl={blog.authorAvatarUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
                            tag="Random"
                            imageUrl="https://placehold.co/100x100"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

*/

export const Blogs = () => {
    return <div className="flex justify-center">

                <div className=" max-w-xl">
                        <BlogCard
                            authorName={"John Doe"}
                            title={"Sample Blog Title"}
                            content={"This is a brief description of the blog post. It should be concise and engaging to attract readers."}
                            publishedDate={"Aug 27, 2025"}
                        />
                        <BlogCard
                            authorName={"John Doe"}
                            title={"Sample Blog Title"}
                            content={"This is a brief description of the blog post. It should be concise and engaging to attract readers."}
                            publishedDate={"Aug 27, 2025"}
                        />
                        <BlogCard
                            authorName={"John Doe"}
                            title={"Sample Blog Title"}
                            content={"This is a brief description of the blog post. It should be concise and engaging to attract readers."}
                            publishedDate={"Aug 27, 2025"}
                        />
                        
                </div>
                

            </div>
    
}