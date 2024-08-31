'use client'
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import '@radix-ui/themes/styles.css';
import { Metadata } from "next";
import { Spinner } from "@radix-ui/themes";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const { status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const router = useRouter();
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoginLoading(true);
            setError(null);
            try {
                const res = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    callbackUrl,
                });

                if (res && !res.error) {
                    router.push(callbackUrl);
                } else {
                    setLoginLoading(false);
                    if (res?.error === 'CredentialsSignin') {
                        setError('Invalid Credentials');
                    } else {
                        setError('Something went wrong');
                    }
                }
            } catch (e: any) {
                setLoginLoading(false);
                setError('An unexpected error occurred');
                console.error(e?.message);
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="bg-white">
            <form onSubmit={formik.handleSubmit} className="mt-8">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <EyeIcon className="h-4 w-4 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                )}
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={loginLoading} type="submit" className="w-full">
                            {loginLoading && <CircularProgress size={20} color={"primary"} />}
                            {loginLoading ? 'Logging In' : 'Log in'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </section>
    );
};

const LoginPageWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Login />
    </Suspense>
);

export default LoginPageWithSuspense;
