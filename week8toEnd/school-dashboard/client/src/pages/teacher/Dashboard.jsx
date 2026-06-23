import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { dashboardTeacher } from '../../api/teacher';
import { toast } from 'react-toastify';

const TeacherDashboard = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["teacher-dashboard"],
        queryFn: dashboardTeacher,
        onSuccess: (data) => {
            toast.success(data.message);
        },
    });

    return (
        <div className="paddingClass">
            <h1 className='text-6xl text-gray-700'>Teacher Portal</h1>
            <p className="mt-4 text-gray-600">Welcome, Professor. Here you can manage your courses and view student progress.</p>
        </div>
    )
}

export default TeacherDashboard