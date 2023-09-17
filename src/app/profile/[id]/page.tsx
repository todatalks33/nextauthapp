import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <>

            <div className="flex flex-col items-center min-h-screen justify-center">
                <h1>Profile
                    <span className="w-auto bg-slate-500 rounded-md text-white ml-4 p-2">
                        {params.id}
                    </span>
                </h1>
            </div>
        </>
    )
}

export default UserProfile