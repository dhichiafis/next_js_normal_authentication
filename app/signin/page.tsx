
"use client";

import { useState } from "react";
import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";

export default function SigninPage() {
    const { login } = useAuth();
    const router=useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('login is pressed');
        await login({ username, password });
        router.push('/dashboard');
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center px-4">

            <p className="text-2xl font-semibold mb-6">
                Sign in
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-full max-w-md p-8 shadow-md rounded-xl"
            >
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="username" className="font-medium">
                        Username
                    </label>

                    <input
                        id="username"
                        className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="font-medium">
                        Password
                    </label>

                    <input
                        id="password"
                        className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

        </div>
    );
}
