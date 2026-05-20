@props(['student'])

<div class="bg-white rounded shadow-sm overflow-hidden border border-gray-200">
    <div class="flex flex-col md:items-center md:flex-row md:justify-between p-6 bg-gray-800 text-white">
        <h3 class="text-2xl font-bold">{{ $student->name }}</h3>
        <p class="opacity-80">Email: {{ $student->email }}</p>
        <p class="opacity-80">Roll Number: {{ $student->roll_no }}</p>
    </div>

    <div class="p-6">
        <h4 class="font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">Subject-wise Marks</h4>
        <div class="space-y-3">
            @foreach($student->marks as $mark)
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">{{ $mark->subject->name }}</span>
                    <span class="font-mono font-bold {{ $mark->score < 40 ? 'text-red-500' : 'text-green-500'}}">
                        {{ $mark->score }} / 100
                    </span>
                </div>
            @endforeach
        </div>

        <div class="mt-6 pt-4 border-t flex justify-between items-center">
            <span class="text-sm text-gray-500">Overall Attendance:</span>
            <span class="font-bold {{ $student->attendance < 75 ? 'text-red-500' : 'text-gray-800' }}">
                {{ $student->attendance }}%
            </span>
        </div>
    </div>
</div>