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