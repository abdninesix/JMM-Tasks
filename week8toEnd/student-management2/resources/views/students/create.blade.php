@extends('layouts.app')

@section('content')
    <h2 class="text-2xl text-center font-bold mb-6">Add New Student</h2>
    <form action="{{ route('students.store') }}" method="POST">
        {{-- @csrf --}}

        @include('partials.form')

        <div class="mt-6 flex justify-end gap-2">
            <a href="{{ route('students.index') }}"
                class="rounded px-2 py-1 font-semibold bg-gray-200 text-gray-700">Cancel</a>
            <button type="submit" class="rounded px-2 py-1 font-semibold bg-gray-800 text-white">Save Student</button>
        </div>
    </form>
@endsection