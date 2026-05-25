<div class="space-y-4">
    <div>
        <label class="block text-sm font-bold text-gray-700">Full Name</label>
        <input type="text" name="name" value="{{ old('name', $student->name ?? '') }}"
            class="w-full border p-2 rounded @error('name') border-red-500 @enderror">
        @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div>
        <label class="block text-sm font-bold text-gray-700">Email Address</label>
        <input type="email" name="email" value="{{ old('email', $student->email ?? '') }}"
            class="w-full border p-2 rounded @error('email') border-red-500 @enderror">
        @error('email') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-bold text-gray-700">Roll Number</label>
            <input type="text" name="roll_no" value="{{ old('roll_no', $student->roll_no ?? '') }}"
                class="w-full border p-2 rounded @error('roll_no') border-red-500 @enderror">
            @error('roll_no') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div>
            <label class="block text-sm font-bold text-gray-700">Attendance (%)</label>
            <input type="number" name="attendance" value="{{ old('attendance', $student->attendance ?? '') }}"
                class="w-full border p-2 rounded @error('attendance') border-red-500 @enderror">
            @error('attendance') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
    </div>
</div>

<div class="mt-8">
    <h3 class="text-2xl text-center font-bold text-gray-800 mb-8">Subject Marks</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @foreach($subjects as $subject)
            <div class="flex items-center justify-between bg-gray-50 p-3 rounded border">
                <label class="text-sm font-semibold text-gray-700">{{ $subject->name }}</label>

                @php
                    $existingMark = isset($student)
                        ? $student->marks->where('subject_id', $subject->id)->first()->score ?? ''
                        : '';
                @endphp

                <input type="number" name="marks[{{ $subject->id }}]"
                    value="{{ old('marks.' . $subject->id, $existingMark) }}" placeholder="0-100"
                    class="w-20 border p-1 rounded text-center @error('marks.' . $subject->id) border-red-500 @enderror">
            </div>
            @error('marks.' . $subject->id)
                <p class="text-red-500 text-xs col-span-2">{{ $message }}</p>
            @enderror
        @endforeach
    </div>
</div>