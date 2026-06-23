import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { dashboardStudent } from '../../api/student';
import { toast } from 'react-toastify';

const StudentDashboard = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["student-dashboard"],
        queryFn: dashboardStudent,
        onSuccess: (data) => {
            toast.success(data.message);
        },
    });

    return (
        <div className="paddingClass">
            <h1 className='text-6xl text-gray-700'>Student Dashboard</h1>
            <p className="mt-4 text-gray-600">Welcome to your learning area. Check your enrolled courses and upcoming assignments.</p>
        </div>
    )
}

export default StudentDashboard