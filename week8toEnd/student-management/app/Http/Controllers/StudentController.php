<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function task1()
    {
        // multidimensional arrays
        $students = [
            ['id' => 1, 'name' => 'John Doe', 'marks' => 85, 'attendance' => 80, 'roll_no' => 101],
            ['id' => 2, 'name' => 'Jane Smith', 'marks' => 35, 'attendance' => 90, 'roll_no' => 102],
            ['id' => 3, 'name' => 'Mike Ross', 'marks' => 92, 'attendance' => 95, 'roll_no' => 103],
            ['id' => 4, 'name' => 'Rachel Zane', 'marks' => 74, 'attendance' => 60, 'roll_no' => 104],
            ['id' => 5, 'name' => 'Harvey Specter', 'marks' => 45, 'attendance' => 70, 'roll_no' => 105],
        ];
        $processedStudents = [];
        // for loop to process students
        foreach ($students as $student) {
            // grades based on percentage (if-elseif-else)
            if ($student['marks'] >= 90) {
                $student['grade'] = 'A+';
            } elseif ($student['marks'] >= 80) {
                $student['grade'] = 'A';
            } elseif ($student['marks'] >= 70) {
                $student['grade'] = 'B';
            } elseif ($student['marks'] >= 60) {
                $student['grade'] = 'C';
            } else {
                $student['grade'] = 'F';
            }
            // displaying Pass or Fail status
            $student['status'] = ($student['marks'] >= 40) ? 'Pass' : 'Fail';
            // showing scholarship eligibility
            if ($student['grade'] == 'A+' && $student['attendance'] >= 90) {
                $student['scholarship'] = 'Eligible';
            } else {
                $student['scholarship'] = 'Not Eligible';
            }
            // attendance below 75%
            $student['attendance_warning'] = ($student['attendance'] < 75) ? 'Low Attendance' : '';
            // roll number is even or odd
            $student['roll_type'] = ($student['roll_no'] % 2 == 0) ? 'Even' : 'Odd';
            $processedStudents[] = $student;
        }
        return view('task1', ['students' => $processedStudents]);
    }

    public function task2()
    {
        return view('task2');
    }
}
