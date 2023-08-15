import { Link, Head } from '@inertiajs/react';

import { PublicWishCard } from '@/Components/PublicWishCard';


export default function Welcome({ postsData, cardTitle, cardLink, cardCTA, auth = null }) {
    return (
        <>
            <Head title='Explore Wish List' />
            <div className="bg-slate-900">
                <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 h-screen">
                        <div className="flex justify-center">
                            <Link className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md" href={route('login')}>
                                <p className="mr-2 inline-block text-white text-sm">
                                    <span className='text-xl text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text font-extrabold'>
                                        WishNex
                                    </span> {' '}
                                    is live. create Account to share/add your wishes
                                </p>
                                <span className="group-hover:bg-white/[.1] py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                                    <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>

                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>

                            {postsData.map((postData) => {
                                return (
                                    <PublicWishCard key={postData.id} postData={postData} cardTitle={cardTitle} cardLink={cardLink}
                                        cardCTA={cardCTA} />
                                )
                            })}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
