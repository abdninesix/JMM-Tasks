<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Student::with('marks.subject');

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('roll_number', 'like', "%{$request->search}%");
        }

        $sortField = $request->input('sort', 'name');
        $sortOrder = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortOrder);

        $students = $query->paginate(10)->withQueryString();

        $allStudents = Student::with('marks')->get();

        $totalStudents = $allStudents->count();
        $classAverage = $allStudents->flatMap->marks->avg('score') ?? 0;

        $passCount = $allStudents->filter(fn($s) => $s->averageMark() >= 40)->count();
        $failCount = $totalStudents - $passCount;

        $topper = $allStudents->sortByDesc(fn($s) => $s->averageMark())->first();

        return view('students.index', [
            'students' => $students,
            'search' => $request->search,
            'stats' => [
                'total' => $totalStudents,
                'average' => round($classAverage, 2),
                'pass' => $passCount,
                'fail' => $failCount,
            ],
            'topper' => $topper
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('students.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request)
    {
        Student::create($request->validated());
        return redirect()->route('students.index')->with('success', 'Student created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load('marks.subject');
        return view('students.show', ['student' => $student]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return view('students.edit', ['student' => $student]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return redirect()->route('students.index')->with('success', 'Student updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student deleted!');
    }
}
