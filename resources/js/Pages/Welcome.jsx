import { PublicWishCard } from '@/Components/PublicWishCard';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, postsData, cardTitle, cardLink, cardCTA }) {
    console.log('postsData :>> ', postsData);
    return (
        <>
            <Head title='Welcome' />
            <div className="bg-slate-900 ">
                <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent h-full">
                    <div className="h-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
                        <div className="flex justify-center">
                            <Link className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md" href={route('login')}>
                                <p className="mr-2 inline-block text-white text-sm">
                                    <span className='text-xl text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text font-extrabold'>
                                        WishNex
                                    </span> {' '}
                                    is live.
                                </p>
                                <span className="group-hover:bg-white/[.1] py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                                    <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>

                        <div className="max-w-3xl text-center mx-auto">
                            <h1 className="block  bg-clip-text text-transparent font-bold bg-gradient-to-r from-blue-200 to-cyan-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                Now it's easier than ever to share your {' '}
                                <span className="text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text">
                                    wishes & get thoughts.
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-3xl text-center mx-auto">
                            <p className="text-2xl bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-transparent">Unlocking Empathy: A Platform to Open Up, Care & Share</p>
                        </div>

                        <div className="text-center">
                            <Link className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800" href={route('login')}>
                                Get started
                                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </Link>
                        </div>

                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>

                            {postsData?.map((postData) => {
                                return (
                                    <PublicWishCard key={postData.id} postData={postData} cardTitle={cardTitle} cardLink={cardLink}
                                        cardCTA={cardCTA} userId={auth?.user?.id} />
                                )
                            })}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
