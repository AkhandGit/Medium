import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
    authorAvatarUrl?: string;
    tag?: string;
    imageUrl?: string;
    publishedDate?: string;
    readTime?: string;
}

//single blog hook
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/post/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlog(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog
    }
}

//blogs hook
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    }
}