<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function task1()
    {
        // multidimensional array
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
        // multidimensional array
        $students = [
            ['id' => 1, 'name' => 'joHn doe', 'marks' => 85, 'attendance' => 80, 'roll_no' => 101],
            ['id' => 2, 'name' => 'jAne smith', 'marks' => 35, 'attendance' => 90, 'roll_no' => 102],
            ['id' => 3, 'name' => 'mike ross', 'marks' => 92, 'attendance' => 95, 'roll_no' => 103],
            ['id' => 4, 'name' => 'raChel zaNe', 'marks' => 74, 'attendance' => 60, 'roll_no' => 104],
            ['id' => 5, 'name' => 'harVey spEcter', 'marks' => 45, 'attendance' => 70, 'roll_no' => 105],
        ];

        // pProducts array for practicing loops
        $products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Webcam'];

        $processedStudents = [];
        $totalMarksSum = 0;
        // using reusable functions
        foreach ($students as $student) {
            $student['name'] = $this->formatName($student['name']);
            $student['grade'] = $this->calculateGrade($student['marks']);
            $student['status'] = $this->checkStatus($student['marks']);
            $student['scholarship'] = $this->scholarshipEligibilty($student['grade'], $student['attendance']);
            $student['attendance_warning'] = ($student['attendance'] < 75);
            $student['roll_type'] = ($student['roll_no'] % 2 == 0) ? 'Even' : 'Odd';
            $student['username'] = $this->generateUsername($student['name'], $student['roll_no']);
            $totalMarksSum += $student['marks'];
            $processedStudents[] = $student;
        }

        // multiplication table using for loop
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
            'student_count' => count($processedStudents)
        ]);
    }

    public function task3()
    {
        // 1. Greeting Message Logic
        $user = "Abdullah";
        $greeting = $this->getGreeting($user);

        // 2. Square Calculation Exercise
        $numberToSquare = 8;
        $squareResult = $this->calculateSquare($numberToSquare);

        // 3. BMI Calculator Exercise (Weight in kg, Height in meters)
        $bmiResult = $this->calculateBMI(70, 1.75);

        // 4. Currency Formatting
        $fees = 1500.50;
        $formattedFees = $this->formatCurrency($fees);

        // 5. Attendance Calculation (Present days / Total days * 100)
        $attendancePercent = $this->calculateAttendance(18, 22);

        return view('task3', [
            'greeting' => $greeting,
            'square' => [
                'num' => $numberToSquare,
                'result' => $squareResult
            ],
            'bmi' => $bmiResult,
            'currency' => $formattedFees,
            'attendance' => $attendancePercent
        ]);
    }


    // reusable functions
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

    private function scholarshipEligibilty(string $grade, int $attendance)
    {
        return ($grade == 'A+' && $attendance >= 90) ? 'Eligible' : 'Not Eligible';
    }

    private function formatName(string $name)
    {
        return ucwords(strtolower($name));
    }

    private function generateUsername(string $name, int $roll)
    {
        return strtolower(explode(' ', $name)[0]) . $roll;
    }

    private function getGreeting($name)
    {
        $hour = date('H');
        if ($hour < 12)
            return "Good Morning, $name!";
        if ($hour < 17)
            return "Good Afternoon, $name!";
        return "Good Evening, $name!";
    }

    private function calculateSquare($n)
    {
        return $n * $n;
    }

    private function calculateBMI($weight, $height)
    {
        // Formula: weight (kg) / [height (m)]^2
        $bmi = $weight / ($height * $height);

        // Determine category
        if ($bmi < 18.5)
            $category = "Underweight";
        elseif ($bmi < 25)
            $category = "Normal";
        elseif ($bmi < 30)
            $category = "Overweight";
        else
            $category = "Obese";

        return [
            'value' => number_format($bmi, 1),
            'category' => $category
        ];
    }

    private function formatCurrency($amount)
    {
        return "$" . number_format($amount, 2);
    }

    private function calculateAttendance($present, $total)
    {
        return ($present / $total) * 100;
    }
}
