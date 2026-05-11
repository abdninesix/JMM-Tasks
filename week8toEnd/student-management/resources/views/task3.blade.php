<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 3 - Functions</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 p-10">

    <div class="max-w-6xl mx-auto">
        @include('partials.header')

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div class="bg-white p-6 rounded-xl shadow-md">
                <h3 class="text-blue-500 font-bold uppercase text-xs mb-2">Math: Square Function</h3>
                <p class="text-gray-700">The square of <span class="font-bold">{{ $square['num'] }}</span> is:</p>
                <p class="text-3xl font-bold text-gray-900">{{ $square['result'] }}</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md">
                <h3 class="text-green-500 font-bold uppercase text-xs mb-2">Health: BMI Calculator</h3>
                <p class="text-gray-700 text-sm">Result: <span class="font-bold text-lg">{{ $bmi['value'] }}</span></p>
                <p class="text-3xl font-bold text-gray-900"> {{ $bmi['category'] }}</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md">
                <h3 class="text-yellow-600 font-bold uppercase text-xs mb-2">Currency Formatting</h3>
                <p class="text-gray-700">Course Fees:</p>
                <p class="text-3xl font-bold text-gray-900">{{ $currency }}</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md">
                <h3 class="text-purple-500 font-bold uppercase text-xs mb-2">Education: Attendance %</h3>
                <p class="text-gray-700">Current Standing:</p>
                <div class="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div class="bg-purple-500 h-4 rounded-full" style="width: {{ $attendance }}%"></div>
                </div>
                <p class="text-right text-xs mt-1 font-bold">{{ round($attendance, 1) }}%</p>
            </div>

        </div>

        <footer class="mt-12 text-center space-x-4">
            <a href="/task2" class="text-slate-400 hover:text-slate-600 text-sm">Back to Task 2</a>
            <a href="/task4" class="text-slate-400 hover:text-slate-600 text-sm">Proceed to Task 3</a>
        </footer>
    </div>

</body>

</html>