import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React from 'react'
import StudentNavbar from "../Components/StudentNavbar";

const Courses = ({ courses, coursesCount }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        duration: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post('/courses');
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure? This wil delete the enrolled students also.')) {
            router.delete(`/courses/${id}`)
        }
    }

    return (
        <>
            <Head title="Courses" />
            <StudentNavbar />
            <div className="max-w-lg mt-10 mx-auto space-y-10">

                {flash.message && (<p className="text-green-600">{flash.message}</p>)}
                <h1 className="text-4xl font-semibold">Course Management</h1>


                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Courses({coursesCount})</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Students</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className={course.students.length == 0 ? "bg-yellow-100" : ""}>
                                    <td>{course.title}</td>
                                    <td>{course.duration}</td>
                                    <td>{course.students.length}</td>
                                    <td>
                                        <Link href={`/courses/${course.id}`} className="text-blue-500">View</Link>
                                        <Link href={`/courses/${course.id}/edit`} className="text-green-500">Edit</Link>
                                        <button className="text-red-500" onClick={() => handleDelete(course.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Add New Course</h2>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <label>Course Title</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="border" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                        <label>Duration</label>
                        <input type="text" value={data.duration} onChange={e => setData('duration', e.target.value)} className="border" />
                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}

                        <button type="submit" disabled={processing} className='bg-black text-white'>
                            {processing ? 'Creating' : 'Create Course'}
                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Courses