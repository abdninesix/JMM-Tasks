<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Laravel Students')</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 p-10">

    <main class="max-w-6xl mx-auto">
        @include('partials.header')
        <x-alert />
        @yield('content')
    </main>

</body>

</html>