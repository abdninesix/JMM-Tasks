<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $allStudents = Student::all();

        $topper = $allStudents->sortByDesc('marks')->first();
        if ($topper) {
            $topper->grade = $this->calculateGrade($topper->marks);
        }

        $stats = [
            'total' => $allStudents->count(),
            'avg_marks' => round($allStudents->avg('marks'), 2),
            'high_attendance' => $allStudents->where('attendance', '>=', 90)->count(),
            'topper' => $topper,
        ];

        $query = Student::query();

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('roll_no', 'LIKE', "%{$search}%");
        }

        $rawStudents = $query->orderBy('marks', 'desc')->get();
        $processedStudents = [];

        foreach ($rawStudents as $student) {
            $student->grade = $this->calculateGrade($student->marks);
            $student->status = $this->checkPassFail($student->marks);
            $student->scholarship = $this->checkScholarship($student->grade, $student->attendance);
            $student->username = $this->generateUsername($student->name, $student->roll_no);
            $processedStudents[] = $student;
        }

        return view('dashboard', [
            'students' => $processedStudents,
            'stats' => $stats,
            'search' => $search
        ]);
    }


    // Helper functions
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

    private function checkPassFail(int $marks)
    {
        return ($marks >= 40) ? 'Pass' : 'Fail';
    }

    private function checkScholarship(string $grade, int $attendance)
    {
        return ($grade == 'A+' && $attendance >= 90) ? 'Eligible' : 'Not Eligible';
    }

    private function generateUsername(string $name, int $roll)
    {
        $firstName = explode(' ', $name)[0];
        return strtolower($firstName) . $roll;
    }
}
