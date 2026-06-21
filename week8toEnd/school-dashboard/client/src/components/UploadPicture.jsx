import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { uploadPicture } from '../api/profile';
import { CgSpinner } from 'react-icons/cg';

const UploadPicture = () => {

    const { user } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: uploadPicture,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["auth-user"],
            });
        },
        onError: (error) => {
            const serverErrors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            if (serverErrors) {
                const messages = Object.values(serverErrors).flat().forEach(message => toast.error(message));
            } else {
                toast.error(message);
            }
        },
    });

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        mutation.mutate(file);
    };

    return (
        <label htmlFor='profile_picture' className="relative cursor-pointer w-24 h-24 rounded-full bg-theme hover:opacity-80 text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
            {!user.profile_picture ? user.full_name?.split(" ").map(word => word.charAt(0).toUpperCase()).join("") : <img src={user.profile_picture} className='size-full object-cover' />}
            <input onChange={handleChange} id="profile_picture" type="file" accept="image/*" onChange={handleChange} hidden />
            {mutation.isPending && <CgSpinner className="absolute animate-spin" />}
        </label>
    )
}

export default UploadPicture