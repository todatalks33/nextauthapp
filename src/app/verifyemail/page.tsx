"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from 'react';

export default function VerifyEmail() {
    const [token, setToken] = React.useState('')
    const [verified, setVerified] = React.useState(false)
    const [error, setError] = React.useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('api/user/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Verify email</h1>
            <h2>{token ? `${token}` : "No token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl"> Email verified</h2>
                    <Link href={'/login'}>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl"> there was an error</h2>

                </div>
            )}
        </div>
    )
}