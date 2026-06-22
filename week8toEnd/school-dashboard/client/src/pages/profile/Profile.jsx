import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaUserEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword, editProfile } from '../../api/profile';
import { changePasswordSchema, profileSchema } from '../../schemas/profileSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import UploadPicture from '../../components/UploadPicture';

const Profile = () => {

    const [editMode, setEditMode] = useState(false);
    const [newPassword, setNewPassword] = useState(false);

    const { user } = useAuth();

    const queryClient = useQueryClient();

    const { register, handleSubmit, setError, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(profileSchema),
    });

    const { register: passwordRegister, handleSubmit: handlePasswordSubmit, setError: setPasswordError, reset: resetPassword, formState: { errors: passwordErrors }, } = useForm({
        resolver: zodResolver(changePasswordSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                full_name: user.full_name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user, reset]);

    const profileMutation = useMutation({
        mutationFn: editProfile,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["auth-user"],
            });
            setEditMode(false);
            toast.success(data.message);
        },
        onError: (error) => {
            const serverErrors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field, { type: "server", message: messages[0] });
                });
            } else if (message) {
                toast.error(message);
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const passwordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data.message);
            resetPassword();
            setNewPassword(false);
        },
        onError: (error) => {
            const serverErrors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setPasswordError(field, { type: "server", message: messages[0] });
                });
            } else if (message) {
                toast.error(message);
            }
        },
    });

    const onSubmit = (data) => {
        profileMutation.mutate(data);
    };

    const onPasswordSubmit = (data) => {
        passwordMutation.mutate(data);
    };

    return (
        <div className='paddingClass'>

            <h1 className='text-6xl text-gray-700'>Profile Settings</h1>

            {user && (
                <div className="mt-10 flex items-start justify-between">
                    <div className='flex gap-6'>
                        <UploadPicture />

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

                        <div>
                            <p className="text-sm uppercase tracking-wider text-gray-500">Role</p>
                            <p className="text-lg">{user.role}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 items-end'>
                        <button onClick={() => setEditMode(prev => !prev)} className='flex items-center gap-2 font-medium text-theme hover:text-theme/80 duration-100 cursor-pointer active:scale-90'>
                            Edit Profile <FaUserEdit size={20} />
                        </button>
                        <button onClick={() => setNewPassword(prev => !prev)} className='flex items-center gap-2 font-medium text-red-500 hover:text-red-500/80 duration-100 cursor-pointer active:scale-90'>
                            Change Password <FaLock size={20} />
                        </button>
                    </div>

                </div>
            )}

            {editMode && (
                <form onSubmit={handleSubmit(onSubmit)} className='mt-10 max-w-lg'>
                    <h1 className='text-6xl text-gray-700'>Edit Profile</h1>

                    <div className="mt-6 flex flex-col gap-2 text-sm">
                        <label htmlFor="full_name" className="font-semibold text-theme">Full Name</label>
                        <input {...register("full_name")} placeholder="Enter full name" id="full_name" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{errors.full_name?.message}</p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="email" className="font-semibold text-theme">Email</label>
                        <input type="email" {...register("email")} placeholder="Enter your email" id="email" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{errors.email?.message}</p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="phone" className="font-semibold text-theme">Phone</label>
                        <input type="tel" {...register("phone")} placeholder="Enter phone number" id="phone" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{errors.phone?.message}</p>
                    </div>

                    <button
                        disabled={profileMutation.isPending}
                        type="submit"
                        className="cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
                    >
                        {profileMutation.isPending ? "Saving" : "Save"}
                    </button>
                </form>
            )}

            {newPassword && (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='mt-10 max-w-lg'>
                    <h1 className='text-6xl text-gray-700'>Change Password</h1>

                    <div className="mt-6 flex flex-col gap-2 text-sm">
                        <label htmlFor="current_password" className="font-semibold text-theme">Current Password</label>
                        <input type='password' {...passwordRegister("current_password")} placeholder="Enter current password" id="current_password" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{passwordErrors.current_password?.message}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 text-sm">
                        <label htmlFor="new_password" className="font-semibold text-theme">New Password</label>
                        <input type='password' {...passwordRegister("new_password")} placeholder="Enter new password" id="new_password" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{passwordErrors.new_password?.message}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 text-sm">
                        <label htmlFor="new_password_confirmation" className="font-semibold text-theme">Confirm Password</label>
                        <input type='password' {...passwordRegister("new_password_confirmation")} placeholder="Confirm new password" id="new_password_confirmation" className="rounded bg-white p-2 outline-theme" />
                        <p className="text-xs text-red-500">{passwordErrors.new_password_confirmation?.message}</p>
                    </div>

                    <button
                        disabled={profileMutation.isPending}
                        type="submit"
                        className="cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
                    >
                        {passwordMutation.isPending ? "Saving" : "Save"}
                    </button>
                </form>
            )}

        </div>
    )
}

export default Profile