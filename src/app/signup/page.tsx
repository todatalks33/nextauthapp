"use client";
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [buttonDisable, setbuttonDisable] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setbuttonDisable(false)
        } else {
            setbuttonDisable(true)
        }
    }, [user])


    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("api/users/signup", user);
            console.log("signup process", response.data)
            router.push('/login')
        } catch (error: any) {
            console.log("signup failed", error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1>{loading ? 'Processing' : 'Signup'}</h1>
            <br />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
                        username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your full name"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
                        email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your full name"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
                        password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your full name"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>



                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onSignup}
                    >
                        {buttonDisable ? "No signup" : "Signup"}
                    </button>

                </div>
                <Link href={'/login'} className='text-black'>goto Login page</Link>
            </div>
        </div>
    )
}

export default SignupPage







