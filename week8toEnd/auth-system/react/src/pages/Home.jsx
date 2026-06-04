import React from 'react'

const Home = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="flex flex-col items-center mt-20 gap-20">

            <h1 className='text-6xl text-gray-700'>Laravel Authentication System</h1>

            {user && (
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold">
                        {user.full_name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">@{user.username}</h1>
                        <p className="text-xl">{user.full_name}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-wider text-gray-500">Gender</p>
                        <p className="text-lg">{user.gender}</p>

                        <p className="text-sm uppercase tracking-wider text-gray-500">Date of Birth</p>
                        <p className="text-lg">{user.dob}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Home