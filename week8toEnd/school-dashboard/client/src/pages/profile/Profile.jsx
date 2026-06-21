import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Profile = () => {

    const { user } = useAuth();

    return (
        <div className='paddingClass'>

            <h1 className='text-6xl text-gray-700'>Profile Settings</h1>

            {user && (
                <div className="mt-10 flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-theme text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
                        {!user.profile_picture ? user.full_name?.split(" ").map(word => word.charAt(0).toUpperCase()).join("") : <img src={user.profile_picture} />}
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

export default Profile