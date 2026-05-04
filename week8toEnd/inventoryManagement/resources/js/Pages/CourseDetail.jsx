import React from 'react'
import StudentNavbar from '../Components/StudentNavbar'
import { Head } from '@inertiajs/react'

const CourseDetail = ({ course }) => {
    return (
        <>
            <Head title="Course Detail" />
            <StudentNavbar />
            <h1>{course.title}</h1>
            <p>Duration: {course.duration}</p>
            <h2>Enrolled Students ({course.students.length})</h2>
            <ul>
                {course.students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </>
    )
}

export default CourseDetail