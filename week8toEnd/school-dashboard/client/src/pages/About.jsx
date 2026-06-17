import React from "react";

const About = () => {
    return (
        <div className="px-6 py-16">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold">About This App</h1>
                <p className="text-gray-500 mt-2">
                    Laravel + React Authentication System
                </p>
            </div>

            {/* Intro */}
            <div className="mb-12">
                <p className="text-lg text-gray-700 leading-relaxed">
                    This is a simple full-stack authentication project built
                    using Laravel for the backend API and React for the
                    frontend. It demonstrates how modern web apps handle
                    authentication, validation, and protected routes.
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
                <div>
                    <p className="text-sm uppercase tracking-wider text-gray-600">
                        Features
                    </p>
                    <div className="mt-2 space-y-1 text-gray-800">
                        <p>• User Registration</p>
                        <p>• User Login</p>
                        <p>• Forgot Password</p>
                        <p>• Password Reset</p>
                        <p>• Form Validation (React Hook Form + Zod)</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm uppercase tracking-wider text-gray-600">
                        Tech Stack
                    </p>
                    <div className="mt-2 space-y-1 text-gray-800">
                        <p>• Laravel API</p>
                        <p>• React (Vite)</p>
                        <p>• TanStack Query</p>
                        <p>• Tailwind CSS v4</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm uppercase tracking-wider text-gray-600">
                        Purpose
                    </p>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                        The goal of this project is to practice real-world
                        authentication flow including token handling, error
                        handling, and frontend/backend separation. It acts as a
                        foundation for more advanced full-stack applications.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;