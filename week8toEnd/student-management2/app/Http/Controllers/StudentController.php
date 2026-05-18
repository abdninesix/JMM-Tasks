<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function task1()
    {
        // multidimensional array
        $students = [
            ['id' => 1, 'name' => 'Ali Raza', 'marks' => 85, 'attendance' => 80, 'roll_no' => 101],
            ['id' => 2, 'name' => 'Ayesha Khan', 'marks' => 35, 'attendance' => 90, 'roll_no' => 102],
            ['id' => 3, 'name' => 'Ahmed Hassan', 'marks' => 92, 'attendance' => 95, 'roll_no' => 103],
            ['id' => 4, 'name' => 'Fatima Noor', 'marks' => 74, 'attendance' => 60, 'roll_no' => 104],
            ['id' => 5, 'name' => 'Bilal Sheikh', 'marks' => 45, 'attendance' => 70, 'roll_no' => 105],
            ['id' => 6, 'name' => 'Hassan Raza', 'marks' => 88, 'attendance' => 85, 'roll_no' => 106],
            ['id' => 7, 'name' => 'Zainab Ali', 'marks' => 67, 'attendance' => 78, 'roll_no' => 107],
            ['id' => 8, 'name' => 'Usman Tariq', 'marks' => 55, 'attendance' => 82, 'roll_no' => 108],
            ['id' => 9, 'name' => 'Maryam Faisal', 'marks' => 98, 'attendance' => 96, 'roll_no' => 109],
            ['id' => 10, 'name' => 'Saad Ahmed', 'marks' => 40, 'attendance' => 65, 'roll_no' => 110],
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
            // roll number even odd
            $student['roll_type'] = ($student['roll_no'] % 2 == 0) ? 'Even' : 'Odd';
            $processedStudents[] = $student;
        }
        return view('task1', ['students' => $processedStudents]);
    }

    public function task2()
    {
        // multidimensional array
        $students = [
            ['id' => 1, 'name' => 'aLi raZa', 'marks' => 85, 'attendance' => 80, 'roll_no' => 101],
            ['id' => 2, 'name' => 'ayEsha khAn', 'marks' => 35, 'attendance' => 90, 'roll_no' => 102],
            ['id' => 3, 'name' => 'ahMed hassAn', 'marks' => 92, 'attendance' => 95, 'roll_no' => 103],
            ['id' => 4, 'name' => 'faTima noOr', 'marks' => 74, 'attendance' => 60, 'roll_no' => 104],
            ['id' => 5, 'name' => 'biLal sheIkh', 'marks' => 45, 'attendance' => 70, 'roll_no' => 105],
            ['id' => 6, 'name' => 'haSsan raZa', 'marks' => 88, 'attendance' => 85, 'roll_no' => 106],
            ['id' => 7, 'name' => 'zaInab aLi', 'marks' => 67, 'attendance' => 78, 'roll_no' => 107],
            ['id' => 8, 'name' => 'usMan tarIq', 'marks' => 55, 'attendance' => 82, 'roll_no' => 108],
            ['id' => 9, 'name' => 'maRyam faIsal', 'marks' => 98, 'attendance' => 96, 'roll_no' => 109],
            ['id' => 10, 'name' => 'saAd ahMed', 'marks' => 40, 'attendance' => 65, 'roll_no' => 110],
        ];

        // products array for practicing loops
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
        // greeting message
        $user = "Abdullah";
        $greeting = $this->getGreeting($user);

        // square of a number
        $numberToSquare = 8;
        $squareResult = $this->calculateSquare($numberToSquare);

        // bmi calculation
        $bmiResult = $this->calculateBMI(70, 1.75);

        // currency formatter
        $fees = 1500.50;
        $formattedFees = $this->formatCurrency($fees);

        // attendance percentage calculation
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

    public function task4(Request $request)
    {
        // students with duplicates
        $students = [
            ['id' => 1, 'name' => 'Ali Raza', 'marks' => 85],
            ['id' => 2, 'name' => 'Ayesha Khan', 'marks' => 90],
            ['id' => 3, 'name' => 'Ahmed Hassan', 'marks' => 92],
            ['id' => 4, 'name' => 'Fatima Noor', 'marks' => 74],
            ['id' => 5, 'name' => 'Bilal Sheikh', 'marks' => 88],
            ['id' => 6, 'name' => 'Hassan Raza', 'marks' => 67],
            ['id' => 7, 'name' => 'Zain Ali', 'marks' => 79],
            ['id' => 8, 'name' => 'Maryam Faisal', 'marks' => 95],
            ['id' => 9, 'name' => 'Usman Tariq', 'marks' => 81],
            ['id' => 10, 'name' => 'Saad Ahmed', 'marks' => 69],
            ['id' => 11, 'name' => 'Ali Raza', 'marks' => 85],
            ['id' => 12, 'name' => 'Bilal Sheikh', 'marks' => 88],
            ['id' => 13, 'name' => 'Maryam Faisal', 'marks' => 95],
            ['id' => 14, 'name' => 'Ayesha Khan', 'marks' => 90],
            ['id' => 15, 'name' => 'Usman Tariq', 'marks' => 81],
        ];

        // remove duplicates
        $uniqueStudents = [];
        $namesSeen = [];
        foreach ($students as $student) {
            if (!in_array($student['name'], $namesSeen)) {
                $uniqueStudents[] = $student;
                $namesSeen[] = $student['name'];
            }
        }

        $totalCount = count($uniqueStudents);

        // sort by marks
        $sortedStudents = $uniqueStudents;
        usort($sortedStudents, function ($a, $b) {
            return $b['marks'] <=> $a['marks'];
        });

        // select topper
        $topper = $sortedStudents[0];

        // search
        $searchTerm = $request->query('search');
        $searchResults = $uniqueStudents;
        if ($searchTerm) {
            $searchResults = array_filter($uniqueStudents, function ($student) use ($searchTerm) {
                return str_contains(strtolower($student['name']), strtolower($searchTerm));
            });
        }

        return view('task4', [
            'originalCount' => count($students),
            'students' => $sortedStudents,
            'topper' => $topper,
            'total' => $totalCount,
            'searchResults' => $searchResults,
            'searchTerm' => $searchTerm
        ]);
    }

    public function task5()
    {
        $rawName = "muHamMaD aBdUlLaH";
        $formattedName = ucwords(strtolower($rawName));

        $blogTitle = "How to Learn Laravel 13 in One Week";
        $slug = strtolower(str_replace(' ', '-', $blogTitle));

        $fullName = "Muhammad Abdullah";
        $parts = explode(' ', $fullName);
        $username = strtolower($parts[1]) . rand(10, 99);

        $skillsArray = ['PHP', 'Laravel', 'Tailwind', 'MySQL'];
        $skillsString = implode(' • ', $skillsArray);

        $bio = "Passionate Laravel developer building awesome web applications.";
        $charCount = strlen($bio);

        $longDescription = "Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks.";
        $shortDescription = substr($longDescription, 0, 50) . "...";

        return view('task5', [
            'name' => ['raw' => $rawName, 'clean' => $formattedName],
            'slug' => ['title' => $blogTitle, 'slug' => $slug],
            'user' => ['full' => $fullName, 'username' => $username],
            'skills' => $skillsString,
            'bio' => ['text' => $bio, 'count' => $charCount],
            'description' => ['long' => $longDescription, 'short' => $shortDescription],
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

    private function getGreeting(string $name)
    {
        $hour = date('H');
        if ($hour < 12)
            return "Good Morning, $name!";
        if ($hour < 17)
            return "Good Afternoon, $name!";
        return "Good Evening, $name!";
    }

    private function calculateSquare(int $n)
    {
        return $n * $n;
    }

    private function calculateBMI(float $weight, float $height)
    {
        $bmi = $weight / ($height * $height);
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

    private function formatCurrency(float $amount)
    {
        return "$" . number_format($amount, 2);
    }

    private function calculateAttendance(int $present, int $total)
    {
        return ($present / $total) * 100;
    }
}
