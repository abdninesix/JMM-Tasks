<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Laravel\Prompts\number;

class StudentController extends Controller
{

    public function index(Request $request)
    {
        $students = Student::with('course')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->course_id, function ($query, $courseId) {
                $query->where('course_id', $courseId);
            })
            ->get();

        return Inertia::render('StudentForm', [
            'students' => $students,
            'courses' => Course::all(),
            'filters' => $request->only(['course_id', 'search'])
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());
        return redirect()->back()->with('message', 'Student added successfully!');
    }

    public function edit(Student $student)
    {
        return Inertia::render('StudentEditForm', [
            'student' => $student,
            'courses' => Course::all()
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return redirect()->back()->with('message', 'Student updated successfully!');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->back()->with('message', 'Student deleted successfully!');
    }
}
