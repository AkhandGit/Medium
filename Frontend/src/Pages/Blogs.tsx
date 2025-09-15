import { Avatar, BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { BlogSkeleton } from "../components/BlogSkeleton";



export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    <AppBar />
    if(loading){
        return <div className="flex justify-center items-center h-screen">
            
            {/*skeletons*/}
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            
        </div>
    }
    return <div >
            <AppBar />
                <div className="flex justify-center">            
                    <div>
                        {blogs.map(blog => <BlogCard
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"Aug 27, 2025"}
                            />)}
                            
                            
                            
                    </div>
                </div>
                

            </div>
    
}