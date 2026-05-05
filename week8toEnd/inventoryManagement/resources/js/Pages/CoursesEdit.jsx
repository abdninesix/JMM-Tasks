import { Head, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import StudentNavbar from '../Components/StudentNavbar';

const CoursesEdit = ({ course }) => {

    const { data, setData, put, processing, errors } = useForm({
        title: course.title,
        duration: course.duration,
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        put(`/courses/${course.id}`);
    };

    return (
        <>
            <Head title="Student Edit Form" />
            <StudentNavbar/>
            <form onSubmit={submit} className="flex flex-col gap-4 max-w-lg mx-auto mt-10">
                {flash.message && <p className="text-green-600">{flash.message}</p>}
                <h1 className="text-4xl font-semibold">Course Edit Form</h1>

                <label>Title</label>
                <input value={data.title} onChange={e => setData('title', e.target.value)} type="text" className="border" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                <label>Duration</label>
                <input value={data.duration} onChange={e => setData('duration', e.target.value)} type="text" className="border" />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}

                <button type="submit" disabled={processing} className='bg-black text-white'>
                    {processing ? "Updating" : "Update"}
                </button>
            </form>
        </>
    )
}

export default CoursesEdit