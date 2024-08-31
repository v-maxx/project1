// components/GuestGuard.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {useAuth} from "@/redux/store";

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactNode
}

const GuestGuard = ({ children, fallback }: GuestGuardProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading || user) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default GuestGuard
