@extends('layouts.app')

@section('content')
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Add New Student</h2>

        <form action="{{ route('students.store') }}" method="POST">
            @csrf
            
            @include('partials.form')

            <div class="mt-6 flex justify-end gap-2">
                <a href="{{ route('students.index') }}" class="px-4 py-2 text-gray-500">Cancel</a>
                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded font-bold">Save Student</button>
            </div>
        </form>
    </div>
@endsection