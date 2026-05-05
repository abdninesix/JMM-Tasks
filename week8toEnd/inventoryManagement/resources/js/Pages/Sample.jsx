import React, { useState } from 'react'
import { IoIosWarning } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaPen, FaRegSave } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const studentData = [
    {
        "studentName": "Ali Khan",
        "ID": "1234567890",
        "quiz": 12,
        "assignment": 14,
        "midTerm": 25,
        "finalExam": 34
    },
    {
        "studentName": "Sara Ahmed",
        "ID": "2345678901",
        "quiz": 13,
        "assignment": 15,
        "midTerm": 28,
        "finalExam": 36
    },
    {
        "studentName": "Usman Tariq",
        "ID": "3456789012",
        "quiz": 10,
        "assignment": 12,
        "midTerm": 20,
        "finalExam": 30
    },
    {
        "studentName": "Ayesha Malik",
        "ID": "4567890123",
        "quiz": 14,
        "assignment": 13,
        "midTerm": 27,
        "finalExam": 38
    },
    {
        "studentName": "Bilal Hussain",
        "ID": "5678901234",
        "quiz": 11,
        "assignment": 10,
        "midTerm": 22,
        "finalExam": 32
    },
    {
        "studentName": "Hassan Raza",
        "ID": "6789012345",
        "quiz": 15,
        "assignment": 14,
        "midTerm": 29,
        "finalExam": 39
    },
    {
        "studentName": "Fatima Noor",
        "ID": "7890123456",
        "quiz": 13,
        "assignment": 12,
        "midTerm": 24,
        "finalExam": 35
    },
    {
        "studentName": "Zain Ali",
        "ID": "8901234567",
        "quiz": 9,
        "assignment": 11,
        "midTerm": 21,
        "finalExam": 31
    },
    {
        "studentName": "Mariam Shah",
        "ID": "9012345678",
        "quiz": 3,
        "assignment": 5,
        "midTerm": 12,
        "finalExam": 18
    },
    {
        "studentName": "Ahmed Raza",
        "ID": "1122334455",
        "quiz": 12,
        "assignment": 13,
        "midTerm": 26,
        "finalExam": 33
    },
    {
        "studentName": "Kiran Iqbal",
        "ID": "2233445566",
        "quiz": 11,
        "assignment": 14,
        "midTerm": 23,
        "finalExam": 34
    },
    {
        "studentName": "Tariq Mehmood",
        "ID": "3344556677",
        "quiz": 10,
        "assignment": 9,
        "midTerm": 19,
        "finalExam": 29
    },
    {
        "studentName": "Sana Javed",
        "ID": "4455667788",
        "quiz": 15,
        "assignment": 15,
        "midTerm": 28,
        "finalExam": 37
    },
    {
        "studentName": "Imran Sheikh",
        "ID": "5566778899",
        "quiz": 13,
        "assignment": 12,
        "midTerm": 25,
        "finalExam": 36
    },
    {
        "studentName": "Nida Farooq",
        "ID": "6677889900",
        "quiz": 14,
        "assignment": 13,
        "midTerm": 27,
        "finalExam": 38
    }
];

const Sample = () => {

    const [editRowId, setEditRowId] = useState(null);

    const calculateTotal = (s) => {
        return s.quiz + s.assignment + s.midTerm + s.finalExam;
    };

    const calculateGrade = (total) => {
        if (total >= 90) return "A";
        if (total >= 80) return "B";
        if (total >= 70) return "C";
        if (total >= 60) return "D";
        return "F";
    };

    const calculateGPA = (total) => {
        const percentage = total / 100;
        const gpa = percentage * 4;

        return gpa.toFixed(1);
    };

    return (
        <div className='p-2 bg-gray-50 space-y-4'>

            <div className='p-4 bg-white border border-gray-200 rounded-sm space-y-4 overflow-x-auto'>

                <h1 className='flex items-center text-lg font-semibold gap-2'><IoArrowBackCircleOutline color='gray' size={25} />Final Grade Review</h1>

                <div className='p-2 flex items-center gap-2 bg-yellow-50 text-orange-700 border border-yellow-500 rounded-sm'>
                    <IoIosWarning size={25} />
                    <div>
                        <h3 className='font-semibold'>Review required</h3>
                        <p className='font-medium text-sm'>Please review all grades carefully before submitting. You may edit grades before confirming.</p>
                    </div>
                </div>

                <table className='w-full text-left text-sm min-w-full'>
                    <thead>
                        <tr className='border-b border-gray-300 [&>th]:py-2 [&>th]:px-4'>
                            <th>Student</th>
                            <th>ID</th>
                            <th>Quiz 1<p className='text-gray-500 font-normal'>/15</p></th>
                            <th>Assignment 1<p className='text-gray-500 font-normal'>/15</p></th>
                            <th>Midterm Exam<p className='text-gray-500 font-normal'>/30</p></th>
                            <th>Final Exam<p className='text-gray-500 font-normal'>/40</p></th>
                            <th>Total<p className='text-gray-500 font-normal'>/100</p></th>
                            <th>Grade</th>
                            <th>GPA</th>
                            <th className='text-end'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((s) => {

                            const total = calculateTotal(s);
                            const grade = calculateGrade(total);
                            const gpa = calculateGPA(total);

                            const isEditing = editRowId === s.ID;

                            return (
                                <tr key={s.ID} className='border-b border-gray-300 font-medium [&>td]:py-2 [&>td]:px-4'>
                                    <td>{s.studentName}</td>
                                    <td>{s.ID}</td>
                                    <td>{s.quiz}</td>
                                    <td>{s.assignment}</td>
                                    <td>{s.midTerm}</td>
                                    <td>{s.finalExam}</td>
                                    <td><span className='px-4 py-1 rounded-sm bg-blue-50'>{total}</span></td>
                                    <td>
                                        <span
                                            className={`px-4 py-1 rounded-sm 
                                            ${grade == "A" ? "bg-green-50 text-green-500" :
                                                    grade == "B" ? "bg-blue-50" :
                                                        grade == "C" ? "bg-yellow-50 text-yellow-500" :
                                                            grade == "D" ? "bg-yellow-50 text-orange-500" :
                                                                "bg-red-50 text-red-500"
                                                }`}>
                                            {grade}
                                        </span>
                                    </td>
                                    <td>{gpa}</td>
                                    <td className='flex justify-end gap-2'>
                                        {!isEditing && <button onClick={() => setEditRowId(s.ID)} className='text-yellow-800 cursor-pointer'><FaPen /></button>}
                                        {isEditing && <button onClick={() => setEditRowId(null)} className='text-green-500 cursor-pointer'><FaRegSave /></button>}
                                        {isEditing && <button onClick={() => setEditRowId(null)} className='text-red-500 cursor-pointer'><RxCross1 /></button>}
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>

                <div className='flex items-center justify-end gap-4'>
                    <span>Rows per page</span>
                    <span>1-5 of 13</span>
                    <button><FaChevronLeft/></button>
                    <button><FaChevronRight/></button>
                </div>
            </div>

            <div className='p-4 bg-white border border-gray-200 rounded-sm space-y-4'>
                <div className='flex items-start gap-2 select-none'>
                    <input id='review' type="checkbox" className='size-6' />
                    <label htmlFor='review'>I have reviewed all grades and confirmed they are correct. I understand that coursework grades (excluding the final exam) will be visible to students immediately, while the final exam grade will only be visible after college approval.</label>
                </div>
                <button className='px-4 py-2 rounded-md font-semibold bg-green-500 text-white'>Submit grades for approval</button>
            </div>

        </div>
    )
}

export default Sample