<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::withCount('students')
            ->when($request->sort === 'max_students', function ($query) {
                $query->orderBy('students_count', 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->get();

        return Inertia::render('Courses', [
            'courses' => $courses,
            'coursesCount' => Course::get()->count(),
            'filters' => $request->only(['sort'])
        ]);

        // The N+1 problem:
        // $courses = Course::all();
        // foreach ($courses as $course) {
        //     $course->students;
        // }
        // return Inertia::render('Courses', [
        //     'courses' => $courses,
        // ]);
    }

    public function store(StoreCourseRequest $request)
    {
        Course::create($request->validated());
        return redirect()->back()->with('message', 'Course created successfully!');
    }

    public function show(Course $course)
    {
        return Inertia::render('CourseDetail', [
            'course' => $course->load('students')
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('CoursesEdit', [
            'course' => $course,
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return redirect()->back()->with('message', 'Course updated successfully!');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->back()->with('message', 'Course deleted successfully!');
    }
}
