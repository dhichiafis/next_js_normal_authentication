"use client";

import Link from "next/link";
import { useAuth } from "../context/authcontext";

export default function Navbar() {
    const { authState } = useAuth();

    return (
        <nav className="flex gap-5 p-4">

            <Link href="/dashboard">
                Dashboard
            </Link>

            {authState.authenticated ? (
                <Link href="/dashboard">
                    Dashboard
                </Link>
            ) : (
                <Link href="/signin">
                    Signin
                </Link>
            )}

        </nav>
    );
}