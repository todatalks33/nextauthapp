"use client";
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'

const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const [buttonDisable, setbuttonDisable] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setbuttonDisable(false)
        } else {
            setbuttonDisable(true)
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('api/users/login', user);
            console.log('Login succesfull', response.data)
            router.push('/profile')
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1>{loading ? "processing" : "login"} </h1>
            <br />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >

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
                        onClick={onLogin}
                    >
                        {buttonDisable ? "No login" : 'Login'}
                    </button>

                </div>
                <Link href={'/signup'} className='text-black'>goto singup page</Link>
            </div>
        </div>
    )
}

export default LoginPage







