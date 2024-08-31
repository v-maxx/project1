"use client"
import type {ReactNode} from 'react'
import {createContext, useContext, useEffect, useState} from 'react'

// ** Next Import
import {useRouter, useSearchParams} from 'next/navigation'

// ** Axios
import axios from 'axios'

// ** Config
import {boolean} from 'yup'
import authConfig from '@/lib/configs/auth'


// ** Types
import type {AuthValuesType, ErrCallbackType, LoginParams, UserDataType} from './types'
import {getSession, useSession} from "next-auth/react";
import {fetchLinks, fetchUserData} from "@/lib/helpers/functions";


// ** Defaults
const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    actionLoading: false,
    setUser: () => null,
    setLoading: () => boolean,
    setActionLoading: () => boolean,
    login: () => Promise.resolve(),
    refetchUserData: () => Promise.resolve(),
    logout: () => Promise.resolve()
}


const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({children}: Props) => {
    // ** States
    const [user, setUser] = useState<any | null>(defaultProvider.user)

    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
    const [actionLoading, setActionLoading] = useState<boolean>(defaultProvider.actionLoading)

    const searchParams = useSearchParams()
    // ** Hooks
    const router = useRouter()


    // useEffect(() => {
    //
    //
    //     (async () => {
    //         setLoading(true)
    //         const session = await getSession()
    //         console.log('session in auth context--', session)
    //         setUser(session?.user)
    //         setLoading(false)
    //
    //     })()
    //
    // }, []);

    // useEffect(() => {
    //     setUser(user)
    //
    // }, [user]);

    useEffect(() => {
        // const storedToken = (window.localStorage.getItem(authConfig.storageTokenKeyName)!)
        //
        // const headers = {
        //     headers: {
        //         Authorization: `Bearer ${storedToken}`
        //     }
        // }

        const initAuth = async (): Promise<void> => {
            setLoading(true)
            // setLoading(false)
            // const storedToken = (window.localStorage.getItem(authConfig.storageTokenKeyName)!)
            const storedToken = true
            // const key = (window.localStorage.getItem('key'))


            const session = await getSession()
            // console.log('session in auth context--',session)
            // setUser( session?.user )




            if (session?.user) {
             // const userData= await fetchUserData()


                // console.log('user data--:', userData)
                setUser(session.user)

                // console.log('user in session', session?.user)
                setLoading(false)


            } else {
                setUser(null)
                setLoading(false)
            }
        }

        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const refetchUserData=async ()=>{
setLoading(true)
        try {
            const userData= await fetchUserData()
            // console.log('user data--:', userData)
            setUser(userData)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
        }


    }

    const handleLogin = async (credentials: any, errorCallback?: ErrCallbackType) => {
        //  console.log('check login handler work')
        //  setActionLoading(true)
        //
        //
        //  try {
        // const db = await getDb()
        //      const user = await db.collection('users').findOne({email: credentials.email});
        //      if (!user) return null;
        //      const isvalid = await bcrypt.compare(credentials.password, user.password)
        //      if (!isvalid) {
        //          throw new Error('Wrong password')
        //      } else {
        //          // console.log('loginStatus 2', authConfig.storageTokenKeyName,(response.data.data))
        //          // window.localStorage.setItem(authConfig.storageTokenKeyName,response.data.data)
        //          setLoading(false)
        //          const returnUrl = searchParams.get('returnUrl')
        //
        //          setUser({...user})
        //
        //          // window.localStorage.setItem('userData', JSON.stringify(response.data))
        //
        //
        //          const redirectURL = returnUrl && returnUrl !== '/login' ? returnUrl : `/home`
        //
        //          // const redirectURL ='/home';
        //
        //          console.log('response.data.data.existingAdmin', user)
        //          console.log('redirectURL---', redirectURL)
        //          router.replace(redirectURL as string)
        //
        //      }
        //
        //  }
        //  catch (err: { [key: string]: string }) {
        //      setActionLoading(false)
        //      console.log('check login error', err)
        //      setLoading(false)
        //
        //      return (errorCallback ? errorCallback(err) : null)
        //  }


    }
    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
        router.push('/login');
    };


    const values = {
        user, loading, actionLoading, setUser, setLoading, setActionLoading, login: handleLogin, logout: handleLogout,refetchUserData


    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}
