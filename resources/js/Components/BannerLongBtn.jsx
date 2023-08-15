import { Link } from "@inertiajs/react";
import { RoundPuls } from "./RoundPuls";

export const BannerLongBtn = ({ title, description, linkUrl }) => {
    return (<div className="max-w-[85rem] px- sm:px-6 lg:px-0 mx-auto mb-10">
        <div className="bg-blue-600 bg-[url('../svg/component/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-md text-center">
            <p className="mr-2 inline-block text-white animate-pulse">
                {title}
            </p>
            <Link className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-full border-2 border-white font-semibold text-white hover:bg-white/[.1] hover:border-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all text-sm" href={linkUrl}>
            <RoundPuls />
                {description}
                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </Link>
        </div>
    </div>);
}