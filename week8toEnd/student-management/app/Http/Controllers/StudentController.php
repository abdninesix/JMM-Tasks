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
        // Task 4: Multidimensional Array
        $students = [
            ['id' => 1, 'name' => 'john doe', 'marks' => 85, 'attendance' => 80, 'roll_no' => 101],
            ['id' => 2, 'name' => 'jane smith', 'marks' => 35, 'attendance' => 90, 'roll_no' => 102],
            ['id' => 3, 'name' => 'mike ross', 'marks' => 92, 'attendance' => 95, 'roll_no' => 103],
            ['id' => 4, 'name' => 'rachel zane', 'marks' => 74, 'attendance' => 60, 'roll_no' => 104],
            ['id' => 5, 'name' => 'harvey specter', 'marks' => 45, 'attendance' => 70, 'roll_no' => 105],
        ];

        // Task 2.4: Products Array for practicing loops
        $products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Webcam'];

        $processedStudents = [];
        $totalMarksSum = 0; // Task 2.3

        foreach ($students as $student) {
            // Task 3: Using Reusable Functions
            $student['name'] = $this->formatName($student['name']);
            $student['grade'] = $this->calculateGrade($student['marks']);
            $student['status'] = $this->checkStatus($student['marks']);
            $student['scholarship'] = $this->isEligibleForScholarship($student['grade'], $student['attendance']);
            $student['attendance_warning'] = ($student['attendance'] < 75);
            $student['roll_type'] = ($student['roll_no'] % 2 == 0) ? 'Even' : 'Odd';

            // Task 3 Exercise: Username generation (Task 5 handling)
            $student['username'] = $this->generateUsername($student['name'], $student['roll_no']);

            $totalMarksSum += $student['marks'];
            $processedStudents[] = $student;
        }

        // Task 2.2: Print multiplication table (using for loop)
        $multiplicationNumber = 5;
        $table = [];
        for ($i = 1; $i <= 10; $i++) {
            $table[] = "$multiplicationNumber x $i = " . ($multiplicationNumber * $i);
        }

        return view('task2', [
            'students' => $processedStudents,
            'products' => $products,
            'table' => $table,
            'total_marks' => $totalMarksSum,
            'student_count' => count($processedStudents) // Task 2.5
        ]);
    }

    // --- Task 3: Reusable Functions ---

    private function calculateGrade(int $marks)
    {
        if ($marks >= 90)
            return 'A+';
        if ($marks >= 80)
            return 'A';
        if ($marks >= 70)
            return 'B';
        if ($marks >= 60)
            return 'C';
        return 'F';
    }

    private function checkStatus(int $marks)
    {
        return ($marks >= 40) ? 'Pass' : 'Fail';
    }

    private function isEligibleForScholarship(string $grade, int $attendance)
    {
        return ($grade == 'A+' && $attendance >= 90) ? 'Eligible' : 'Not Eligible';
    }

    private function formatName(string $name)
    {
        return ucwords(strtolower($name)); // Task 5 Handling
    }

    private function generateUsername(string $name, int $roll)
    {
        // Task 5 & Task 3 Exercise
        return strtolower(explode(' ', $name)[0]) . $roll;
    }
}
