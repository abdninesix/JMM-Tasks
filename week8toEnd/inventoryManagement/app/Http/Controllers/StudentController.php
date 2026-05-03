<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function create()
    {
        // We fetch the courses so the user can select one in the dropdown
        return Inertia::render('Students/Create', [
            'courses' => Course::all()
        ]);
    }
}
