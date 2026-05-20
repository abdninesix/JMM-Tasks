@extends('layouts.app')

@section('content')
    <div class="mb-4">
       <a href="{{ route('students.index') }}" class="rounded px-2 py-1 font-semibold bg-gray-800 text-white">Go Back</a>
    </div>

    <x-student-card :student="$student" />

    <div class="mt-6 flex gap-4 justify-end">
        
        <a href="{{ route('students.edit', $student) }}" class="rounded px-2 py-1 font-semibold bg-gray-800 text-white">Edit
            Profile</a>

        <form action="{{ route('students.destroy', $student) }}" method="POST"
            onsubmit="return confirm('Are you sure you want to delete this student?')">
            {{-- @csrf --}}
            @method('DELETE')
            <button type="submit" class="rounded px-2 py-1 font-semibold bg-gray-800 text-white">Delete Student</button>
        </form>
    </div>
@endsection