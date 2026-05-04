<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Courses', [
            'courses' => Course::get()
        ]);
    }

    public function store(StoreCourseRequest $request)
    {
        Course::create($request->validated());
        return redirect()->route('courses.index')->with('message', 'Course created successfully!');
    }

    public function show(Course $course)
    {
        return Inertia::render('CourseDetail', [
            'course' => $course->load('students')
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->back()->with('message', 'Course deleted successfully!');
    }
}
