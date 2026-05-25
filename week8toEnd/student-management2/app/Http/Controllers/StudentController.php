<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Student;
use App\Models\Subject;
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
                ->orWhere('roll_no', 'like', "%{$request->search}%");
        }

        if ($request->filled('grade')) {
            $grade = $request->grade;
            $query->whereHas('marks', function ($q) use ($grade) {
                $q->select('student_id')
                    ->groupBy('student_id');

                if ($grade == 'A+')
                    $q->havingRaw('AVG(score) >= 90');
                elseif ($grade == 'A')
                    $q->havingRaw('AVG(score) >= 80 AND AVG(score) < 90');
                elseif ($grade == 'B')
                    $q->havingRaw('AVG(score) >= 70 AND AVG(score) < 80');
                elseif ($grade == 'C')
                    $q->havingRaw('AVG(score) >= 60 AND AVG(score) < 70');
                elseif ($grade == 'D')
                    $q->havingRaw('AVG(score) >= 40 AND AVG(score) < 60');
                elseif ($grade == 'F')
                    $q->havingRaw('AVG(score) < 40');
            });
        }

        $sortField = $request->input('sort', 'name');
        $query->orderBy($sortField, 'asc');

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
            'selectedGrade' => $request->grade,
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
        $subjects = Subject::all();
        return view('students.create', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request)
    {
        $student = Student::create($request->validated());

        foreach ($request->marks as $subjectId => $score) {
            $student->marks()->create([
                'subject_id' => $subjectId,
                'score' => $score
            ]);
        }

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
        $subjects = Subject::all();
        $student->load('marks');
        return view('students.edit', ['student' => $student, 'subjects' => $subjects]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        foreach ($request->marks as $subjectId => $score) {
            $student->marks()->updateOrCreate(
                ['subject_id' => $subjectId],
                ['score' => $score]
            );
        }

        return redirect()->route('students.show', $student)->with('success', 'Student updated!');
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
