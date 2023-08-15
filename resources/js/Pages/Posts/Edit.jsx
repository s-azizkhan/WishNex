import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { CreateWishForm } from './Partials/CreateWish';

export function GoToWishListBtn() {
    return (<div className="max-w-[85rem] px- sm:px-6 lg:px-0 mx-auto mb-10">
        <div className="bg-blue-600 bg-[url('../svg/component/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-md text-center">
            <p className="mr-2 inline-block text-white animate-pulse">
                Want to see your wishes! 🌟
            </p>
            <Link className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-full border-2 border-white font-semibold text-white hover:bg-white/[.1] hover:border-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all text-sm" href={route('posts.index')}>
                Click here to View / Manage your wish list
                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </Link>
        </div>
    </div>);
}
export default function Create({ auth, postData, postStatuses, postVisibilities, postType }) {
    return (
        <AppLayout
            user={auth.user}
            header={
                <>
                    <ol className="flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                        <li className="text-sm text-gray-600 dark:text-gray-400">
                            <Link className="flex items-center hover:text-blue-600" href={route('dashboard')}>
                                Home
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                                </svg>
                            </Link>
                        </li>

                        <li className="text-sm text-gray-600 dark:text-gray-400">
                            <Link className="flex items-center hover:text-blue-600" href={route('posts.index')}>
                                Wish
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
                                </svg>
                            </Link>
                        </li>

                        <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-200" aria-current="page">
                            Create Wish
                        </li>
                    </ol>
                </>
            }
        >
            <Head title="Update Wish" />
            <GoToWishListBtn />

            <CreateWishForm postStatuses={postStatuses} postVisibilities={postVisibilities} postType={postType} postData={postData} />


        </AppLayout>
    );
}
