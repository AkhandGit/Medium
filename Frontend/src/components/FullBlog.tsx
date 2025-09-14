import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog: Blog}) => {
    return <div>
            <AppBar />
                <div className="flex justify-center">
                    <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl">
                        <div className="col-span-8">
                            <div className="text-5xl font-extrabold">
                                {blog.title}
                            </div>
                            <div className="text-slate-500 pt-2">
                                Posted on 2nd December 2025
                            </div>
                            <div className="pt-4">
                                {blog.content}
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="text-slate-600 text-lg">
                                Author
                            </div>
                            
                            <div className="flex">
                                <div className="pr-3 flex flex-col justify-center">
                                    <Avatar name={blog.author.name} size="big" />

                                </div>
                                

                                <div >
                                    <div className="text-xl font-bold pt-2 ">
                                        {blog.author.name}
                                    </div>
                            
                                    <div className="pt-2 text-slate-600">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe commodi impedit, ullam atque ab rem fugit laboriosam molestiae ratione similique architecto hic fugiat ipsa inventore, sint id. Ipsum, dolorum quos.
                                    </div>



                                </div>
                                
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>

}