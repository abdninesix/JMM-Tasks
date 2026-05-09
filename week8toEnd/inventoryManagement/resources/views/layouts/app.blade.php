<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Laravel Site</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>
     @include('partials.nav')

    <div class="content">
        @yield('content')
    </div>

    <footer>
        <p>&copy; 2024 My Laravel App</p>
    </footer>

    <script src="{{ asset('js/script.js') }}"></script>
</body>

</html>