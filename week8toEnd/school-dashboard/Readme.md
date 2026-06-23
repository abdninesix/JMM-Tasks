This `README.md` provides a professional overview of the Mid-Level Full-Stack project you've built, covering both the Laravel architecture and the React implementation.

***

# Full-Stack JWT Authentication & RBAC System

A complete full-stack web application featuring secure stateless authentication, many-to-many role management, and a dynamic frontend dashboard system.

## Key Features

### Backend (Laravel 11)
- **JWT Authentication:** Secure stateless auth using `tymon/jwt-auth`.
- **Many-to-Many Roles:** Advanced RBAC system (Admin, Teacher, Student) using pivot tables.
- **Profile Management:** Image upload handling (Laravel Storage), profile updates, and secure password changing.
- **Admin Module:** User management with server-side pagination, role assignment, and user deletion.
- **Data Seeding:** Automated seeding of 50+ users with random roles for testing.
- **Form Requests:** Strict validation logic for all endpoints using dedicated Request classes.

### Frontend (React 19)
- **TanStack Query (v4):** Efficient data fetching, mutation handling, and automatic cache invalidation.
- **Auth Context API:** Centralized global state for user sessions and persistence.
- **Axios Interceptors:** Automatic Bearer token injection and **Silent Token Refresh** logic.
- **Protected Routes:** Higher-order components for role-based navigation guards.
- **Responsive UI:** Clean design using Tailwind CSS, React Icons, and React Toastify.
- **Forms:** Sophisticated validation using React Hook Form and Zod schemas.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, TanStack Query, Zod, React Hook Form, React Router.
- **Backend:** Laravel, MySQL, JWT-Auth.
- **Tools:** Laragon (Mailpit), Vite, Postman.

---

## Installation & Setup

### 1. Backend Setup
```bash
# Clone and install dependencies
composer install

# Configure Environment
cp .env.example .env
# Update DB credentials in .env

# Generate keys
php artisan key:generate
php artisan jwt:secret

# Link storage for profile pictures
php artisan storage:link

# Run migrations and seed roles/users
php artisan migrate:fresh --seed
```

### 2. Frontend Setup
```bash
# Navigate to react folder
npm install

# Configure .env
# Create .env and set VITE_API_URL=http://localhost:8000/api/

# Run development server
npm run dev
```

---

## API Endpoints Reference

### Public Routes
- `POST /api/auth/register` - Create new account (Default: Student).
- `POST /api/auth/login` - Authenticate and receive JWT.
- `POST /api/auth/forgot-password` - Trigger reset email (Mailpit).

### User Protected Routes (`auth:api`)
- `GET /api/auth/me` - Initial auth verification.
- `GET /api/auth/user/profile` - Get full user details.
- `PUT /api/auth/user/profile` - Update name, email, phone.
- `POST /api/auth/user/upload-picture` - Upload multipart/form-data image.
- `POST /api/auth/user/change-password` - Secure password update.
- `POST /api/auth/refresh` - Issue new JWT using expired-but-valid token.

### Admin Protected Routes (`role:Admin`)
- `GET /api/auth/admin/users?page={n}` - Paginated user list.
- `POST /api/auth/admin/users/{id}/assign-role` - Update user permissions.
- `DELETE /api/auth/admin/users/{id}` - Remove user from system.

---

## Testing the RBAC System

1. **Seed Data:** Run `php artisan db:seed`.
2. **Admin Access:** Login with `admin@test.com` / `password`.
3. **Role Restriction:** Try accessing the `/admin/users` page while logged in as a Student; the `ProtectedRoute` will automatically block access and redirect you.
4. **Token Refresh:** Set `JWT_TTL=1` in Laravel `.env`. Notice how the Axios interceptor handles the 401 error and refreshes the token silently without disrupting the UI.

---

## 📁 Folder Structure

```text
├── backend (Laravel)
│   ├── app/Http/Controllers/Api  # Auth & Admin Logic
│   ├── app/Http/Middleware       # Role Checking
│   ├── app/Http/Resources        # API Data Transformation
│   └── database/seeders          # Role & User Factories
│
├── frontend (React)
│   ├── src/api                   # Axios services
│   ├── src/context               # AuthContext & State
│   ├── src/components            # UI & ProtectedRoute
│   └── src/pages                 # Dashboards & Auth Forms
```

## 📄 License
Created for the **Mid-Level Full-Stack Training Program**.