
interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    authorAvatarUrl?: string;
    tag?: string;
    imageUrl?: string;
}

export const BlogCard = ({
    id,
    authorName = "Anonymous",
    title = "Blog Title",
    content = "This is a brief description of the blog post. It should be concise and engaging to attract readers.",
    publishedDate = "Jan 1, 2023",
    authorAvatarUrl = "none",
    tag = "Side Hustle",
    imageUrl = "https://placehold.co/100x100"
}: BlogCardProps) => {
    return (
        <div className="flex border-b py-6 px-2 md:px-0">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    {authorAvatarUrl === "none" ? (
                        <Avatar name={authorName} />) : (
                    <img
                        src={authorAvatarUrl}
                        alt={authorName}
                        className="w-7 h-7 rounded-full"
                    />
                    )}
                    <span className="text-sm font-semibold text-gray-900">{authorName}</span>
                    <span className="text-xs text-gray-500">· {publishedDate}</span>
                    <span className="text-xs text-yellow-600">⭐ Member-only</span>
                </div>
                <a href={`/blog/${id}`} className="block hover:underline">
                    <h2 className="text-2xl font-bold leading-snug mb-1">
                        {title}
                    </h2>
                </a>
                <p className="text-gray-700 text-base mb-3 line-clamp-2">
                    {content.slice(0, 100) + "..."}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                    </span>
                    <span className="text-xs text-gray-500">{`${Math.ceil(content.length / 100)} minutes`}</span>
                    <div className="flex items-center gap-2 ml-auto">
                        <button className="hover:bg-gray-100 rounded-full p-1">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500"><path d="M6 10l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button className="hover:bg-gray-100 rounded-full p-1">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500"><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/><circle cx="4" cy="10" r="1.5"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Right: Image */}
            <div className="ml-4 flex-shrink-0 hidden sm:block">
                <img
                    src={imageUrl}
                    alt="Blog"
                    className="w-[100px] h-[100px] object-cover rounded"
                />
            </div>
        </div>
    );
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
            {name.charAt(0).toUpperCase()}
            </span>
        </div>

    );
}