<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 3 - Functions</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-10">

    <div class="max-w-4xl mx-auto">
        <header class="mb-10 text-center">
            <h1 class="text-3xl font-bold text-gray-800">{{ $greeting }}</h1>
            <p class="text-gray-500 italic">Task 3: Reusable Functions & Exercises</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Square Function -->
            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                <h3 class="text-blue-500 font-bold uppercase text-xs mb-2">Math: Square Function</h3>
                <p class="text-gray-700">The square of <span class="font-bold">{{ $square['num'] }}</span> is:</p>
                <p class="text-3xl font-bold text-gray-900">{{ $square['result'] }}</p>
            </div>

            <!-- BMI Calculator -->
            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                <h3 class="text-green-500 font-bold uppercase text-xs mb-2">Health: BMI Calculator</h3>
                <p class="text-gray-700 text-sm">Result: <span class="font-bold text-lg">{{ $bmi['value'] }}</span></p>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                    {{ $bmi['category'] }}
                </span>
            </div>

            <!-- Currency Formatting -->
            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
                <h3 class="text-yellow-600 font-bold uppercase text-xs mb-2">Finance: Currency Formatting</h3>
                <p class="text-gray-700">Course Fees:</p>
                <p class="text-3xl font-bold text-gray-900">{{ $currency }}</p>
            </div>

            <!-- Attendance Percentage -->
            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                <h3 class="text-purple-500 font-bold uppercase text-xs mb-2">Education: Attendance %</h3>
                <p class="text-gray-700">Current Standing:</p>
                <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div class="bg-purple-500 h-4 rounded-full" style="width: {{ $attendance }}%"></div>
                </div>
                <p class="text-right text-xs mt-1 font-bold">{{ round($attendance, 1) }}%</p>
            </div>

        </div>

        <div class="mt-10 text-center">
            <a href="/task2" class="text-blue-500 hover:underline mr-4">← Back to Task 2</a>
            <span class="text-gray-300">|</span>
            <a href="/task4" class="text-blue-500 hover:underline mr-4">Proceed to Task 4 →</a>
        </div>
    </div>

</body>
</html>