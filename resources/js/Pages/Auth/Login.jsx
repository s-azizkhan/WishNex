import { useEffect } from 'react';
//import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from '@/Components/ui/switch';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/*<Card className="w-[350px]">
                <form onSubmit={submit}>
                    <CardHeader>
                        <CardTitle>Login to continue</CardTitle>
                        <CardDescription>Deploy your wish in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email" placeholder="abc@gmail.com" type="email"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />

                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Your wish secret key</Label>
                                <Input
                                    id="password" placeholder="****"
                                    type="password"
                                    name="password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />

                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <span className="align-items-baseline">
                                    <Switch
                                        name="remember"
                                        id="remember"
                                        onClick={() => setData('remember', !data.remember)}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="remember" className="mt-6">
                                        Remember me
                                    </Label>
                                </span>

                                <InputError message={errors.remember} className="mt-2" />

                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}
                        <Button disabled={processing} type="submit" className="w-full">Go</Button>
                    </CardFooter>
                </form>
                <Link
                    href={route('register')}
                >

                    <Button type="submit" className="w-auto m-5 ">Register</Button>
                </Link>
            </Card>*/}

            <main className="w-full max-w-md mx-auto ">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign In</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Forgot your password? {' '}
                                <Link className="text-blue-600 decoration-2 hover:underline font-medium" href={route('password.request')}>
                                    Reset password
                                </Link>
                            </p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account? {' '}
                                <Link className="text-blue-600 decoration-2 hover:underline font-medium" href={route('register')}>
                                    Create account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">

                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>

                            {/* Form */}
                            <form onSubmit={submit}>
                                <div className="grid gap-y-4">
                                    {/* Form Group */}
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" className="block text-sm mb-2 dark:text-white" />

                                        <TextInput
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            autoComplete="email"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.email} className="text-xs mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Password" className="block text-sm mb-2 dark:text-white" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    {/* End Form Group */}

                                    <Button disabled={processing} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gradient-to-tr from-rose-500 to-red-600">Go</Button>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                    </div>
                </div>
            </main>

            {/*<form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>*/}
        </GuestLayout>
    );
}
