"use client"
import axios from "axios"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = React.useState('nothing')
    async function logOut() {
        try {
            const response = await axios.get('api/users/logout')
            router.push('/login');
        } catch (error: any) {
            console.log(error.message)
        }
    }


    const getUserDetails = async () => {
        const response = await axios.get('api/users/me')
        console.log(response.data)
        setData(response.data.data.username)
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div className="flex flex-col items-center min-h-screen justify-center ">
            <button onClick={logOut} className='px-[20px] py-[6px] bg-white text-black rounded-md'>Logout</button>
            {/* <button onClick={getUserDetails} className='px-[20px] py-[6px] bg-slate-500 text-black rounded-md'>getData</button> */}
            <h1>Profile</h1>
            <p>Profile page</p>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        </div>
    )
}