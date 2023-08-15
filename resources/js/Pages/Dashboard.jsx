import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button as MyBtn } from "@/components/ui/button"
import { Button } from "@material-tailwind/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from '@/Components/InputError';
import { useToast } from '@/Components/ui/use-toast';
import { useEffect } from 'react';
import { BannerLongBtn } from '@/Components/BannerLongBtn';

export default function Dashboard({ auth }) {

    const { toast } = useToast()

    const user = auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        redirect: route('dashboard'),
    });

    const showToast = (recentlySuccessful) => {
        if (!recentlySuccessful) return;
        console.log('recentlySuccessful :>> ', recentlySuccessful);
        toast({
            title: "Profile Updated",
            description: "Your profile has been updated.",
        })
    }

    useEffect(showToast, [recentlySuccessful]);

    const updateProfile = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-center p-2">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in! Add wish & explore like minded people.  </div>
                        <BannerLongBtn description={"Click here to View / Manage your wish list"} linkUrl={route('posts.index')} title={" Want to see your wishes! 🌟"} key={'create'} />


                        <Dialog>
                            <DialogTrigger asChild>
                                <MyBtn >Edit Profile</MyBtn>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={updateProfile}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="Name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                data-isfocused={true}
                                                autoComplete="name"
                                                className="col-span-3" />

                                            <InputError className="mt-2" message={errors.name} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">
                                                Email
                                            </Label>
                                            <Input
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                data-isfocused={true}
                                                autoComplete="email" className="col-span-3" />
                                            <InputError className="mt-2" message={errors.email} />

                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button disabled={processing} type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
