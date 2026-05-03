<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Laravel\Prompts\number;

class StudentController extends Controller
{
    public function create()
    {
        return Inertia::render('StudentForm', [
            'courses' => Course::all()
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());
        return redirect()->back()->with('message', 'Student added successfully!');
    }

    public function edit(Student $student)
    {
        return Inertia::render('Students/Edit', [
            'student' => $student,
            'courses' => Course::all()
        ]);
    }
}
