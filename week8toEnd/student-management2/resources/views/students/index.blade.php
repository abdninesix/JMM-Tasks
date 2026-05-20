@extends('layouts.app')

@section('title', 'Student Management')

@section('content')
    <div class="space-y-8">

        <form action="{{ route('students.index') }}" method="GET" class="flex gap-2">
            <input type="text" name="search" value="{{ $search }}" placeholder="Search name or roll no..."
                class="flex-1 p-1 border rounded shadow-sm focus:ring-2 focus:ring-gray-500 outline-none">
            <button type="submit"
                class="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 font-semibold">Search</button>
            @if($search)
                <a href="{{ route('students.index') }}"
                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 font-semibold">Clear</a>
            @endif
        </form>

        <div class="bg-white shadow-sm border border-gray-200 rounded overflow-auto">
            <table class="w-full text-left border-collapse min-w-full">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Roll. No</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Name</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Attendance</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @forelse($students as $student)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4">{{ $student->roll_no }}</td>
                            <td class="px-6 py-4">{{ $student->name }}</td>
                            <td class="px-6 py-4">{{ $student->attendance }}%</td>
                            <td class="px-6 py-4">
                                <a class="text-blue-500" href="{{ route('students.show', $student) }}">View</a>
                                <a href="{{ route('students.edit', $student) }}" class="text-yellow-500">Edit</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-10 text-center text-gray-400 italic">No students found matching your
                                criteria.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>

            <div class="py-4 px-6">
                {{ $students->links() }}
            </div>
        </div>

    </div>
@endsection