import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React from "react";
import StudentNavbar from "../Components/StudentNavbar";

const StudentForm = ({ courses, students }) => {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        age: '',
        course_id: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post('/students');
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(`/students/${id}`)
        }
    }

    return (
        <>
            <Head title="Student Form" />
            <StudentNavbar/>
            <div className="max-w-lg mt-10 mx-auto space-y-10">

                {flash.message && <p className="text-green-600">{flash.message}</p>}
                <h1 className="text-4xl font-semibold">Student Management</h1>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Students</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.course.title}</td>
                                    <td>{student.course.duration}</td>
                                    <td>
                                        <Link href={`/students/${student.id}/edit`} className="text-green-500">Edit</Link>
                                        <button className="text-red-500" onClick={() => handleDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Add New Student</h2>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <label>Name</label>
                        <input value={data.name} onChange={e => setData('name', e.target.value)} type="text" className="border" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <label>Email</label>
                        <input value={data.email} onChange={e => setData('email', e.target.value)} type="email" className="border" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <label>Age</label>
                        <input value={data.age} onChange={e => setData('age', e.target.value)} type="number" className="border" />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

                        <label>Course</label>
                        <select value={data.course_id} onChange={e => setData('course_id', e.target.value)} className="border">
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                        {errors.course_id && <p className="text-red-500 text-sm">{errors.course_id}</p>}

                        <button type="submit" disabled={processing} className='bg-black text-white'>
                            {processing ? "Creating" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default StudentForm;
