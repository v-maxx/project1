'use client'
import React, {Suspense, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import '@radix-ui/themes/styles.css';
import {Metadata} from "next";
import {Spinner} from "@radix-ui/themes";
import CircularProgress from "@mui/material/CircularProgress";
import {LoaderIcon} from "lucide-react";
import {BiLoaderAlt} from "react-icons/bi";


// export function generateMetadata(): Metadata {
//     return {
//         title: 'Login',
//     }
// }
// export const metadata: Metadata = {
//     title: 'Login',
//
// };

const Login = () => {
    const {status} = useSession()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const handleSubmit = async (e: any) => {
        e?.preventDefault()

        setLoginLoading(true)
        try {
            const res = await signIn('credentials', {
                redirect: false, email, password, callbackUrl
            })

            if (res && !res.error) {
                router.push(callbackUrl)

            } else {
                setLoginLoading(false)

                if (res?.error === 'CredentialsSignin') {
                    setError('Invalid Credentials')
                }
                setError('Something went wrong')
            }

        } catch (e: any) {
            setLoginLoading(false)
            console.error(e?.message)

        }

    }

    return (<section className="bg-white ">

            <div className="grid grid-cols-1 lg:grid-cols-1 h-screen">


                <div
                    className="flex items-center justify-center px-4 py-10 bg-gradient-to-b from-[#6366f180] to-[#9333ea60]  sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in </h2>
                        {/*<p typeof={'button'} onClick={() => router.replace('/register')}*/}
                        {/*   className="mt-2 text-base text-gray-600">Don’t have an account? <a href="#" title=""*/}
                        {/*                                                                      className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Create*/}
                        {/*    a free account</a></p>*/}

                        <form action="#" method="POST" onSubmit={handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Email
                                        address </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                            </svg>
                                        </div>

                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="Enter email to get started"
                                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor=""
                                               className="text-base font-medium text-gray-900"> Password </label>

                                        {/*<a href="#" title=""*/}
                                        {/*   className="text-sm font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"> Forgot*/}
                                        {/*    password? </a>*/}
                                    </div>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                />
                                            </svg>
                                        </div>

                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            name=""
                                            id=""
                                            placeholder="Enter your password"
                                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>
                                {error && <div className=" mt-2 w-full text-start text-sm text-red-500">{error}</div>}


                                <div>
                                    <button
                                        disabled={loginLoading}
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                    >
                                        {loginLoading &&  <CircularProgress size={20} color={"primary"}/>}

                                        {loginLoading ? 'Logging In' :  " Log in" }




                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};


const LoginPageWithSuspense = () => (<Suspense fallback={<div>Loading...</div>}>
        <Login/>
    </Suspense>);
export default LoginPageWithSuspense;
