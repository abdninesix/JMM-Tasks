<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 4 - Array Manipulation</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-50 p-10">

    <div class="max-w-6xl mx-auto">
       @include('partials.header')

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-blue-600 text-white p-4 rounded-lg shadow">
                <p class="text-xs uppercase opacity-80">Class Topper</p>
                <p class="text-xl font-bold">{{ $topper['name'] }} ({{ $topper['marks'] }}%)</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p class="text-xs uppercase text-gray-400">Unique Records</p>
                <p class="text-xl font-bold text-gray-800">{{ $total }} Students</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p class="text-xs uppercase text-gray-400">Duplicates Removed</p>
                <p class="text-xl font-bold text-red-500">{{ $originalCount - $total }}</p>
            </div>
        </div>

        <!-- Search Form -->
        <form action="/task4" method="GET" class="mb-8 flex gap-2">
            <input type="text" name="search" value="{{ $searchTerm }}" placeholder="Search student by name..."
                class="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <button type="submit"
                class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">Search</button>
            @if($searchTerm)
                <a href="/task4" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300">Clear</a>
            @endif
        </form>

        <!-- Results Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-100 border-b">
                    <tr>
                        <th class="p-4 font-bold text-gray-600">ID</th>
                        <th class="p-4 font-bold text-gray-600">Student Name</th>
                        <th class="p-4 font-bold text-gray-600">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($searchResults as $index => $student)
                        <tr class="border-b hover:bg-gray-50">
                            <td class="p-4">{{ $student['id'] }}</td>
                            <td class="p-4 font-medium">{{ $student['name'] }}</td>
                            <td class="p-4">
                                <div class="w-full bg-gray-200 rounded-full h-2 w-32">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: {{ $student['marks'] }}%"></div>
                                </div>
                                <span class="text-xs text-gray-500">{{ $student['marks'] }}%</span>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="p-10 text-center text-gray-400">No students found matching
                                "{{ $searchTerm }}"</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</body>

</html>