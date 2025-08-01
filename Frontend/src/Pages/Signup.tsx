import { Quotes } from "../components/Quotes";
import { Auth } from "../components/Auth";

export const Signup = () => {
    return (
        <div className="flex min-h-screen flex-row">
            {/* Left side - Signup form */}
            <div className="flex flex-1 flex-col justify-center items-center w-full">
                <Auth type="signup" />
            </div>

            {/* Right side - Testimonial (hidden on mobile) */}
            <div className="flex-1 bg-[#f5f6f7] justify-center items-center hidden lg:flex">
                <Quotes
                    quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                    author="Jules Winnfield"
                    title="CEO, Acme Inc"
                />
            </div>
        </div>
    )
}