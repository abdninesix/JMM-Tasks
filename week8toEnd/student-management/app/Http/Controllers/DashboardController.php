<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $query = Student::query();

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('roll_no', 'LIKE', "%{$search}%");
        }

        $students = $query->orderBy('marks', 'desc')->get();

        $stats = [
            'total' => $students->count(),
            'avg_marks' => round($students->avg('marks'), 2),
            'high_attendance' => $students->where('attendance', '>=', 90)->count(),
            'topper' => $students->first()
        ];

        return view('dashboard', compact('students', 'stats', 'search'));
    }
}
