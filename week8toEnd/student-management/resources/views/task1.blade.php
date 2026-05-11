@extends('layouts.app')

@section('title', 'Task 1')

@section('content')

    <div class="bg-white shadow-md rounded-lg overflow-auto">
        <table class="w-full text-left border-collapse min-w-full">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Roll No</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Name</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Marks</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Attendance</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Grade</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Status</th>
                    <th class="py-4 px-6 font-semibold uppercase text-sm">Scholarship</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @foreach($students as $student)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="py-4 px-6">
                            <span class="font-medium">{{ $student['roll_no'] }}</span>
                            <span class="text-xs block text-gray-400">{{ $student['roll_type'] }}</span>
                        </td>
                        <td class="py-4 px-6 font-medium text-gray-700">{{ $student['name'] }}</td>
                        <td class="py-4 px-6">{{ $student['marks'] }}%</td>
                        <td class="py-4 px-6">
                            <span class="{{ $student['attendance_warning'] ? 'text-red-600 font-bold' : 'text-gray-600' }}">
                                {{ $student['attendance'] }}%
                            </span>
                        </td>
                        <td class="py-4 px-6">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                {{ $student['grade'] }}
                            </span>
                        </td>
                        <td class="py-4 px-6">
                            <span
                                class="font-semibold {{ $student['status'] == 'Pass' ? 'text-green-600' : 'text-red-600' }}">{{ $student['status'] }}</span>
                        </td>
                        <td class="py-4 px-6">
                            <span
                                class="text-sm {{ $student['scholarship'] == 'Eligible' ? 'text-purple-600 font-bold' : 'text-gray-400' }}">
                                {{ $student['scholarship'] }}
                            </span>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

@endsection

@section('pages')
    <a href="/task2" class="text-slate-400 hover:text-slate-600 text-sm">Proceed to Task 2</a>
@endsection