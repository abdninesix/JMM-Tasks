@props(['student'])

<div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    <div class="bg-blue-600 p-6 text-white">
        <h3 class="text-2xl font-bold">{{ $student->name }}</h3>
        <p class="opacity-80">Roll Number: {{ $student->roll_no }} | Email: {{ $student->email }}</p>
    </div>
    
    <div class="p-6">
        <h4 class="font-bold text-gray-700 uppercase text-xs tracking-wider mb-4 border-b pb-2">Subject-wise Marks</h4>
        <div class="space-y-3">
            @foreach($student->marks as $mark)
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">{{ $mark->subject->name }}</span>
                    <span class="font-mono font-bold @if($mark->score < 40) text-red-500 @else text-green-600 @endif">
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