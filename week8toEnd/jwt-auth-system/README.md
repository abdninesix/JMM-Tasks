# Laravel JWT Authentication API

A secure RESTful API built with Laravel and JWT (JSON Web Token) for user authentication, role-based access control, and password management.

## Features
- **JWT Authentication:** Secure token-based auth using `tymon/jwt-auth`.
- **User Management:** Registration and Login with custom fields (`username`, `full_name`, `gender`, `dob`).
- **Role-Based Access Control (RBAC):** Middleware to protect routes for `admin` vs `user`.
- **Password Recovery:** Forgot password via local email (Mailpit) and reset via token.
- **Resource Formatting:** Consistent API responses using Laravel API Resources.

---

## Setup Instructions

1. **Clone the repository and install dependencies:**
   ```bash
   composer install
   ```

2. **Setup Environment:**
   ```bash
   cp .env.example .env
   # Update DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
   ```

3. **Generate Security Keys:**
   ```bash
   php artisan key:generate
   php artisan jwt:secret
   ```

4. **Run Migrations:**
   ```bash
   php artisan migrate
   ```

5. **Serve the Application:**
   ```bash
   php artisan serve
   ```

---

## API Documentation

**Base URL:** `http://localhost:8000/api/auth`  
**Headers:** 
- `Accept: application/json`
- `Authorization: Bearer {YOUR_TOKEN}` (for protected routes)

### 1. Authentication Endpoints

#### **Register User**
`POST /auth/register`
- **Body (JSON):**
```json
{
    "username": "ali123",
    "full_name": "Ali Sher",
    "email": "ali@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "gender": "male",
    "dob": "2000-01-01"
}
```

#### **Login User**
`POST /auth/login`
- **Body (JSON):**
```json
{
    "email": "ali@example.com",
    "password": "password123"
}
```
- **Response:** Returns `token` and `user` object.

#### **Get Profile (Protected)**
`GET /auth/me`
- **Response:** Returns the authenticated user's data.

#### **Refresh Token (Protected)**
`POST /auth/refresh`
- **Response:** Invalidates the old token and returns a new one.

#### **Logout (Protected)**
`POST /auth/logout`
- **Response:** Invalidate the current token.

---

### 2. Password Management

#### **Forgot Password**
`POST /auth/forgot-password`
- **Body:** `{"email": "ali@example.com"}`
- **Action:** Sends a 64-character token to the user's email (check Mailpit at `localhost:8025`).

#### **Reset Password**
`POST /auth/reset-password`
- **Body (JSON):**
```json
{
    "email": "ali@example.com",
    "token": "PASTE_TOKEN_FROM_EMAIL",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

---

### 3. Admin Endpoints (RBAC)

#### **List All Users**
`GET /admin/users`
- **Middleware:** `auth:api`, `isAdmin`
- **Response:** Returns a list of all registered users (Only accessible if `user.role === 'admin'`).

---

## Testing with Mailpit
1. Ensure Laragon is running.
2. Trigger the **Forgot Password** endpoint.
3. Open `http://localhost:8025` in your browser.
4. Copy the token from the email to use in the **Reset Password** request.

## Project Structure
- **`app/Http/Controllers/Api/AuthController.php`**: Main logic for all endpoints.
- **`app/Http/Middleware/IsAdmin.php`**: Role checking logic.
- **`app/Http/Resources/UserResource.php`**: Data transformation layer.
- **`app/Mail/ResetPasswordMail.php`**: Email configuration.