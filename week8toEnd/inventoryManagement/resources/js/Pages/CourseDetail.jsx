import React from 'react'
import StudentNavbar from '../Components/StudentNavbar'
import { Head } from '@inertiajs/react'

const CourseDetail = ({ course }) => {
    return (
        <>
            <Head title="Course Detail" />
            <StudentNavbar />
            <div className="max-w-lg mt-10 mx-auto space-y-10">
                <h1 className="text-4xl font-semibold">{course.title}</h1>
                <p>Duration: {course.duration}</p>
                <h2 className="text-2xl font-semibold">Enrolled Students ({course.students.length})</h2>
                <ul>
                    {course.students.map((student) => (
                        <li key={student.id}>

                            {student.name}&nbsp;({student.age} Years old)
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default CourseDetail