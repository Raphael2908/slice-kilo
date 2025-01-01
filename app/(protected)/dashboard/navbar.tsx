'use client'
import Link from "next/link";
import { useState } from "react";
export default function Navbar(){
    const [isOpened, setOpen] = useState<Boolean>(false)
    return (
        <nav className="absolute py-4 px-2 h-full backdrop-blur-md">
            <div className="flex flex-col w-full sticky">
                <Link href='/dashboard'>Dashboard</Link>
                <Link href='/dashboard/account'>Account</Link>
            </div>
        </nav>
    )
}