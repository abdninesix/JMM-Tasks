@extends('layouts.app')

@section('title', 'Student Management')

@section('content')
    <div class="space-y-8">

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded shadow">
                <p class="text-xs font-bold text-gray-400 uppercase">Total Students</p>
                <p class="text-2xl font-bold">{{ $stats['total'] }}</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
                <p class="text-xs font-bold text-gray-400 uppercase">Class Average</p>
                <p class="text-2xl font-bold">{{ $stats['average'] }}%</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
                <p class="text-xs font-bold text-gray-400 uppercase">Pass / Fail</p>
                <p class="text-lg font-bold"><span class="text-green-600">{{ $stats['pass'] }}</span> / <span
                        class="text-red-500">{{ $stats['fail'] }}</span></p>
            </div>
            @if($topper)
                <div class="bg-white p-4 rounded shadow">
                    <p class="text-xs font-bold text-gray-400 uppercase">Class Topper</p>
                    <p class="text-lg font-bold truncate">{{ $topper->name }}</p>
                    <p class="text-xs font-mono">{{ round($topper->averageMark(), 1) }}% Avg</p>
                </div>
            @endif
        </div>

        <form action="{{ route('students.index') }}" method="GET" class="flex gap-2">
            <input type="text" name="search" value="{{ $search }}" placeholder="Search name or roll no..."
                class="flex-1 p-1 border rounded shadow-sm focus:ring-2 focus:ring-gray-500 outline-none">
            <select name="grade" class="p-1 border rounded">
                <option value="">All Grades</option>
                <option value="A+" {{ request('grade') == 'A+' ? 'selected' : '' }}>Grade A+</option>
                <option value="A" {{ request('grade') == 'A' ? 'selected' : '' }}>Grade A</option>
                <option value="B" {{ request('grade') == 'B' ? 'selected' : '' }}>Grade B</option>
                <option value="C" {{ request('grade') == 'C' ? 'selected' : '' }}>Grade C</option>
                <option value="D" {{ request('grade') == 'D' ? 'selected' : '' }}>Grade D</option>
                <option value="F" {{ request('grade') == 'F' ? 'selected' : '' }}>Grade F</option>
            </select>
            <select name="sort" class="p-1 border rounded">
                <option value="name" {{ request('sort') == 'name' ? 'selected' : '' }}>Sort by Name</option>
                <option value="attendance" {{ request('sort') == 'attendance' ? 'selected' : '' }}>Sort by Attendance</option>
            </select>
            <button type="submit" class="bg-gray-800 text-white px-2 py-1 rounded font-semibold">Apply</button>
            @if($search || $selectedGrade)
                <a href="{{ route('students.index') }}"
                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded font-semibold">Clear</a>
            @endif
        </form>

        <div class="bg-white shadow-sm border border-gray-200 rounded overflow-auto">
            <table class="w-full text-left border-collapse min-w-full">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Roll. No</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Name</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Avg Marks</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Grade</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Attendance</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @forelse($students as $student)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4">{{ $student->roll_no }}</td>
                            <td class="px-6 py-4">{{ $student->name }}</td>
                            <td class="px-6 py-4">{{ round($student->averageMark(), 1) }}%</td>
                            <td class="px-6 py-4">
                                <span
                                    class="px-2 py-1 rounded text-xs font-bold {{ $student->grade == 'F' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600' }}">
                                    {{ $student->grade }}
                                </span>
                            </td>
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