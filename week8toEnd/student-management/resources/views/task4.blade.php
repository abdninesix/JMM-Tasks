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

        <form action="/task4" method="GET" class="mb-8 flex gap-2">
            <input type="text" name="search" value="{{ $searchTerm }}" placeholder="Search student by name..."
                class="flex-1 p-1 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <button type="submit"
                class="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 font-semibold">Search</button>
            @if($searchTerm)
                <a href="/task4"
                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 font-semibold">Clear</a>
            @endif
        </form>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="w-full text-left border-collapse min-w-full">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">ID</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Student Name</th>
                        <th class="py-4 px-6 font-semibold uppercase text-sm">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($searchResults as $index => $student)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="p-4">{{ $student['id'] }}</td>
                            <td class="p-4 font-medium">{{ $student['name'] }}</td>
                            <td class="py-4 px-6">{{ $student['marks'] }}%</td>
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