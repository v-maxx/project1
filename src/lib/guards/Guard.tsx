// components/Guard.tsx
'use client'

import { ReactNode } from 'react'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'

import {useAuth} from "@/store/store";
import Spinner from "@/molecules/spinner";

interface GuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
}

const Guard = ({ children, authGuard = false, guestGuard = false }: GuardProps) => {
  const { user, loading } = useAuth()

  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (authGuard) {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }else if (authGuard && guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  }

  return <>{children}</>
}

export default Guard
