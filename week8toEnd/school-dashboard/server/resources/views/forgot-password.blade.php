<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
</head>

<body>
    <h1>Hello, {{ $user->full_name }}</h1>
    <p>You requested a password reset. Please use the token below to reset your password in your API client:</p>

    <div style="background: #f4f4f4; padding: 10px; border: 1px solid #ccc; font-family: monospace;">
        {{ $token }}
    </div>

    <p>If you did not request this, please ignore this email.</p>
</body>

</html>