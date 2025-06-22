import React from 'react';
import { GuestHeader } from '@/components/guest'

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
        <GuestHeader/>
        <div className="min-h-screen flex items-center justify-center ">
            <div className="max-w-2xl w-full space-y-8  ">
                {children}
            </div>
        </div>
        </>
    );
}
