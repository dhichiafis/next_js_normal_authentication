"use client";

import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { logout } = useAuth();
    const router = useRouter();

    async function logoutHandle() {
        await logout();
        router.replace("/signin");
    }

    return (
        <div>
            <h1>This is the dashboard</h1>
            <p>You have successfully logged in.</p>

            <button
                type="button"
                onClick={logoutHandle}
            >
                Logout
            </button>
        </div>
    );
}