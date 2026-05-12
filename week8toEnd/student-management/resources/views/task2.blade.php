@extends('layouts.app')

@section('title', 'Task 2')

@section('content')

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-gray-500 text-sm font-bold uppercase">Total Students</h3>
            <p class="text-2xl font-bold">{{ $student_count }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-gray-500 text-sm font-bold uppercase">Total Marks in Class</h3>
            <p class="text-2xl font-bold">{{ $total_marks }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-gray-500 text-sm font-bold uppercase">Avg Percentage</h3>
            <p class="text-2xl font-bold">{{ number_format($total_marks / $student_count, 1)  }}%</p>
        </div>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <table class="w-full text-left border-collapse">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="py-4 px-6 text-sm uppercase">Roll / Username</th>
                    <th class="py-4 px-6 text-sm uppercase">Name</th>
                    <th class="py-4 px-6 text-sm uppercase">Marks</th>
                    <th class="py-4 px-6 text-sm uppercase">Attendance</th>
                    <th class="py-4 px-6 text-sm uppercase">Grade</th>
                    <th class="py-4 px-6 text-sm uppercase">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @foreach($students as $student)
                    <tr>
                        <td class="py-4 px-6">
                            <span class="font-medium">{{ $student['roll_no'] }}</span>
                            <span class="text-xs block text-purple-500 italic">{{ '@' . $student['username'] }}</span>
                        </td>
                        <td class="py-4 px-6 font-medium">{{ $student['name'] }}</td>
                        <td class="py-4 px-6">{{ $student['marks'] }}%</td>
                        <td class="py-4 px-6 {{ $student['attendance_warning'] ? 'text-red-600 font-bold' : '' }}">
                            {{ $student['attendance'] }}%
                        </td>
                        <td class="py-4 px-6"><span
                                class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{{ $student['grade'] }}</span>
                        </td>
                        <td class="py-4 px-6 font-bold {{ $student['status'] == 'Pass' ? 'text-green-600' : 'text-red-600' }}">
                            {{ $student['status'] }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div class="h-fit bg-white p-6 shadow-md rounded-lg">
            <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">Multiplication Table (For Loop)</h3>
            <ul class="space-y-1 text-gray-600 font-mono">
                @foreach($table as $row)
                    <li>{{ $row }}</li>
                @endforeach
            </ul>
        </div>

        <div class="h-fit bg-white p-6 shadow-md rounded-lg">
            <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">Product Inventory (Foreach Loop)</h3>
            <div class="flex flex-col gap-1">
                @foreach($products as $item)
                    <span class="text-gray-700 text-sm">{{ $item }}</span>
                @endforeach
            </div>
        </div>
    </div>

@endsection

@section('pages')
    <a href="/task1" class="text-slate-400 hover:text-slate-600 text-sm">Back to Task 1</a>
    <a href="/task3" class="text-slate-400 hover:text-slate-600 text-sm">Proceed to Task 3</a>
@endsection