@extends('layouts.app')

@section('title', 'Final Dashboard - Student Management')

@section('content')
    <div class="space-y-8">

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-400 uppercase">Total Students</p>
                <p class="text-2xl font-bold text-gray-800">{{ $stats['total'] }}</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-400 uppercase">Class Average</p>
                <p class="text-2xl font-bold text-blue-600">{{ $stats['avg_marks'] }}%</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-400 uppercase">High Attendance (90%+)</p>
                <p class="text-2xl font-bold text-green-600">{{ $stats['high_attendance'] }}</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-400 uppercase">Top Scorer</p>
                <p class="text-sm font-bold text-gray-800 truncate">{{ $stats['topper']->name ?? 'N/A' }}</p>
                <p class="text-xs text-purple-600 font-bold italic">{{ $stats['topper']->marks ?? 0 }}% - Grade
                    {{ $stats['topper']->grade ?? 'N/A' }}</p>
            </div>
        </div>

         <form action="/dashboard" method="GET" class="flex gap-2">
            <input type="text" name="search" value="{{ $search }}" placeholder="Search name or roll no..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <button type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Search</button>
            @if($search)
                <a href="/dashboard" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Clear</a>
            @endif
        </form>

        <div class="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student Info</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Marks</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Attendance</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Grade</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Scholarship</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($students as $student)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="font-bold text-gray-800">{{ ucwords(strtolower($student->name)) }}</div>
                                <div class="text-xs text-gray-400 font-mono">Roll: {{ $student->roll_no }} | @
                                    {{ $student->username }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm font-medium">{{ $student->marks }}%</span>
                                <div class="w-16 bg-gray-200 h-1 rounded-full mt-1">
                                    <div class="bg-blue-500 h-1 rounded-full" style="width: {{ $student->marks }}%"></div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="text-sm {{ $student->attendance < 75 ? 'text-red-600 font-bold' : 'text-gray-600' }}">
                                    {{ $student->attendance }}%
                                </span>
                                @if($student->attendance < 75)
                                    <span class="text-[10px] block text-red-400 italic">Shortage</span>
                                @endif
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="px-2.5 py-0.5 rounded-full text-xs font-bold border 
                                    {{ $student->grade == 'A+' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-blue-50 border-blue-200 text-blue-700' }}">
                                    {{ $student->grade }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                @if($student->status == 'Pass')
                                    <span class="text-green-600 text-sm font-bold flex items-center gap-1">
                                        Passed
                                    </span>
                                @else
                                    <span class="text-red-600 text-sm font-bold flex items-center gap-1">
                                        Failed
                                    </span>
                                @endif
                            </td>
                            <td
                                class="px-6 py-4 text-xs font-bold {{ $student->scholarship == 'Eligible' ? 'text-purple-600' : 'text-gray-300' }}">
                                {{ strtoupper($student->scholarship) }}
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
        </div>

    </div>
@endsection

@section('pages')
    <a href="/task3" class="text-slate-400 hover:text-slate-600 text-sm">Back to Task 5</a>
@endsection