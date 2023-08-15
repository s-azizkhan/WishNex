import { Head, Link } from '@inertiajs/react';
import { BannerLongBtn } from '@/Components/BannerLongBtn';
import AppLayout from '@/Layouts/AppLayout';
import { PublicWishCard } from '@/Components/PublicWishCard';

export async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.copy(true, text);
    }
}

export default function PostList({ auth, postsData, cardTitle, cardLink, cardCTA }) {
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

                        <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-200" aria-current="page">
                            Wish List
                        </li>
                    </ol>
                </>
            }
        >
            <Head title="Wish List" />

            <BannerLongBtn description={"Create Wish / Add to to your wish list"} linkUrl={route('posts.create')} title={"Have wish! 🌟"} key={'post-list-page'} />


            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {postsData?.map((postData) => {
                    return (
                        <PublicWishCard key={postData.id} postData={postData} cardTitle={cardTitle} 
                            cardCTA={cardCTA} userId={auth.user.id} />
                    )
                })}
            </div>


        </AppLayout>
    );
}
