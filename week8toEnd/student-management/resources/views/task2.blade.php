<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<!-- ... Keep your existing header ... -->

<body class="bg-gray-100 p-10">
    <div class="max-w-6xl mx-auto">

        <!-- Task 2.3 & 2.5: Summary Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 class="text-gray-500 text-sm font-bold uppercase">Total Students</h3>
                <p class="text-2xl font-bold">{{ $student_count }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 class="text-gray-500 text-sm font-bold uppercase">Total Marks (Class)</h3>
                <p class="text-2xl font-bold">{{ $total_marks }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 class="text-gray-500 text-sm font-bold uppercase">Avg Percentage</h3>
                <p class="text-2xl font-bold">{{ $total_marks / $student_count }}%</p>
            </div>
        </div>

        <!-- Main Student Table (Your existing table, just updated column names) -->
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
                            <td
                                class="py-4 px-6 font-bold {{ $student['status'] == 'Pass' ? 'text-green-600' : 'text-red-600' }}">
                                {{ $student['status'] }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Task 2.2 & 2.4: Secondary Sections -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Multiplication Table -->
            <div class="bg-white p-6 shadow-md rounded-lg">
                <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">Multiplication Table (For Loop)</h3>
                <ul class="space-y-1 text-gray-600 font-mono">
                    @foreach($table as $row)
                        <li>{{ $row }}</li>
                    @endforeach
                </ul>
            </div>

            <!-- Products List -->
            <div class="bg-white p-6 shadow-md rounded-lg">
                <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">Stationary Inventory (Foreach Loop)</h3>
                <div class="flex flex-wrap gap-2">
                    @foreach($products as $item)
                        <span class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">📦 {{ $item }}</span>
                    @endforeach
                </div>
            </div>
        </div>

        <footer class="mt-10 text-center text-gray-400 text-sm pb-10">
            Tasks 1, 2, 3, and 4 in progress...
        </footer>
    </div>
</body>

</html>