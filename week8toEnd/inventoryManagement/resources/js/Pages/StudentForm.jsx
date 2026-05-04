import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";

const StudentForm = ({ courses }) => {

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

    return (
        <>
            <Head title="Student Form" />
            <form onSubmit={submit} className="flex flex-col gap-4 max-w-lg mx-auto mt-10">
                {flash.message && <p className="text-green-600">{flash.message}</p>}
                <h1 className="text-4xl font-semibold">Student Form</h1>
                <input value={data.name} onChange={e => setData('name', e.target.value)} type="text" className="border" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input value={data.email} onChange={e => setData('email', e.target.value)} type="email" className="border" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input value={data.age} onChange={e => setData('age', e.target.value)} type="number" className="border" />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

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
        </>
    );
};

export default StudentForm;
