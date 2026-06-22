import React from 'react';
import { features, techStack } from '../utils/data';

const About = () => {
    
    return (
        <div className="paddingClass space-y-16 py-12">
            {/* Hero Section */}
            <header className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-gray-800">
                    About the <span className="text-theme">Project</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-500">
                    A comprehensive Mid-Level Full-Stack Authentication system designed to showcase modern development
                    practices in Laravel and React.
                </p>
            </header>

            {/* Features Grid */}
            <section className="grid gap-8 md:grid-cols-3">
                {features.map((f, i) => (
                    <div key={i} className="rounded-xl border border-theme/10 bg-theme/5 p-6 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-theme text-white">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">{f.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{f.text}</p>
                    </div>
                ))}
            </section>

            {/* Tech Stack Section */}
            <section className="space-y-8">
                <h2 className="text-center text-3xl font-bold text-gray-800 underline decoration-theme decoration-4 underline-offset-8">
                    Tech Stack & Tools
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {techStack.map((tech, index) => (
                        <div key={index} className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm border border-gray-100">
                            <div className="text-3xl">{tech.icon}</div>
                            <div>
                                <h4 className="font-bold text-gray-700">{tech.name}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Project Summary */}
            <section className="rounded-2xl bg-gray-900 p-8 text-white shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">System Architecture</h2>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                            The backend leverages a <strong>Many-to-Many relationship</strong> between users and roles,
                            ensuring a scalable permission system. On the frontend, a centralized <strong>Auth Context</strong>
                            manages the session state, while <strong>Axios Interceptors</strong> handle token persistence
                            and auto-logout functionality.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h4 className="text-theme font-bold mb-2">Development Highlights:</h4>
                        <ul className="text-sm space-y-2 text-gray-300 list-disc list-inside">
                            <li>Form validation with Zod & React Hook Form.</li>
                            <li>Stateless Auth using JWT (JSON Web Tokens).</li>
                            <li>Image processing via Laravel Storage disk.</li>
                            <li>Automated data seeding with Model Factories.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;