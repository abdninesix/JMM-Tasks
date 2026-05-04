import React from 'react'

const CourseDetail = ({ course }) => {
    return (
        <div>
            <h1>{course.title}</h1>
            <p>Duration: {course.duration}</p>
            <h2>Enrolled Students ({course.students.length})</h2>
            <ul>
                {course.students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default CourseDetail