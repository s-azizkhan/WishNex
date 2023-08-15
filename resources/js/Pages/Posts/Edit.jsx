import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { CreateWishForm } from './Partials/CreateWish';
import { BannerLongBtn } from '@/Components/BannerLongBtn';

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

            <BannerLongBtn description={"Click here to View / Manage your wish list"} linkUrl={route('posts.index')} title={" Want to see your wishes! 🌟"} key={'post-edit-page'} />

            <CreateWishForm postStatuses={postStatuses} postVisibilities={postVisibilities} postType={postType} postData={postData} />


        </AppLayout>
    );
}
