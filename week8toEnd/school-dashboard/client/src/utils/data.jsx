import { FaDatabase, FaImage, FaLaravel, FaLock, FaReact, FaUserShield } from 'react-icons/fa';
import { SiJsonwebtokens, SiReactquery, SiTailwindcss } from 'react-icons/si';


export const techStack = [
    { name: "Laravel", icon: <FaLaravel className="text-red-600" />, desc: "Robust PHP framework providing the REST API and JWT authentication." },
    { name: "React", icon: <FaReact className="text-blue-400" />, desc: "Modern frontend library for a fast and reactive user interface." },
    { name: "JWT Auth", icon: <SiJsonwebtokens className="text-purple-500" />, desc: "Secure token-based authentication for stateless API communication." },
    { name: "TanStack Query", icon: <SiReactquery className="text-red-500" />, desc: "Powerful data fetching, caching, and state synchronization." },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, desc: "Utility-first CSS framework for consistent and modern UI design." },
    { name: "MySQL", icon: <FaDatabase className="text-blue-600" />, desc: "Relational database managing users, roles, and pivot relationships." },
];

export const features = [
    { title: "Role-Based Access (RBAC)", icon: <FaUserShield />, text: "Separate permissions for Admin, Teacher, and Student roles." },
    { title: "Secure Profile Management", icon: <FaLock />, text: "Encrypted password hashing and secure profile updates." },
    { title: "Binary Media Handling", icon: <FaImage />, text: "Profile picture uploads stored via Laravel's storage system." },
];