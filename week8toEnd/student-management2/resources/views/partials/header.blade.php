<header class="mb-8 flex items-center justify-between">
  <span class="text-2xl font-bold text-gray-800">Student Dashboard</span>
    <div class="flex gap-2 justify-center [&>a]:rounded [&>a]:px-2 [&>a]:py-1 [&>a]:font-semibold [&>a]:bg-gray-800 [&>a]:text-white">
        <a href="{{ route('students.index') }}">Home</a>
        <a  href="{{ route('students.create') }}">Add New</a>
    </div>
</header>