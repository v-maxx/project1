// components/AuthGuard.tsx
'use client'

import { ReactNode, ReactElement, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import {useSession} from "next-auth/react";
import {useAuth} from "@/redux/store";

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { user, loading } = useAuth()
  const session= useSession()
  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    if (loading) return
    if (user === null ) {
      router.push('/login?returnUrl=' + encodeURIComponent(pathname))
    }
  }, [loading, user, router,session])


  // console.log('cheching auth guard--',loading,user)
  if (loading) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
