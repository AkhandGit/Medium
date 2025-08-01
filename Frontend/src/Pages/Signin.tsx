import { Auth } from "../components/Auth";
import { Quotes } from "../components/Quotes";

export const Signin = () => {
    return (
        <div className="flex min-h-screen flex-row">
            {/* Left side - Testimonial (hidden on mobile) */}
            <div className="flex-1 bg-[#f5f6f7] justify-center items-center hidden md:flex">
                <Quotes
                    quote="Medium helps me stay up to date with the latest stories and ideas from people around the world."
                    author="Mia Wallace"
                    title="Writer & Reader"
                />
            </div>
            {/* Right side - Signin form */}
            <div className="flex flex-1 flex-col justify-center items-center w-full">
                <Auth type="signin" />
            </div>
        </div>
    )
}
