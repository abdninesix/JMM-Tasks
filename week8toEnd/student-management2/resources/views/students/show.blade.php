@extends('layouts.app')

@section('content')
    <div class="max-w-xl mx-auto">
        <div class="mb-4">
            <a href="{{ route('students.index') }}" class="text-sm text-gray-500 hover:text-blue-600">← Back to List</a>
        </div>

        <x-student-card :student="$student" />

        <div class="mt-6 flex gap-4 justify-center">
            <a href="{{ route('students.edit', $student) }}" class="bg-yellow-500 text-white px-6 py-2 rounded font-bold">Edit Profile</a>
            
            <form action="{{ route('students.destroy', $student) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this student?')">
                {{-- @csrf --}}
                @method('DELETE')
                <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded font-bold">Delete Student</button>
            </form>
        </div>
    </div>
@endsection