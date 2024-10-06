"use client"; // 이 파일이 Client Component임을 명시합니다.

import React, { useState } from 'react';

interface Project {
    title: string;
    progress: number;
    daysLeft: number;
}

const projects: Project[] = [
    { title: 'Web Designing', progress: 60, daysLeft: 2 },
    { title: 'Mobile App Development', progress: 50, daysLeft: 3 },
    { title: 'SEO Optimization', progress: 70, daysLeft: 5 },
];

const Home: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const handleProjectClick = (index: number) => {
        setSelectedProject(index);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 사이드바 */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <nav className="mt-6">
                    <ul>
                        {projects.map((project, index) => (
                            <li
                                key={index}
                                className="mb-4 cursor-pointer"
                                onClick={() => handleProjectClick(index)}
                            >
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* 메인 컨텐츠 */}
            <main className="flex-1 p-6">
                {/* 상단 헤더 */}
                <div className="flex justify-between">
                    <h2 className="text-3xl font-semibold">Home</h2>
                    <div>December, 12</div>
                </div>

                {/* 프로젝트 카드들 */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {selectedProject !== null && (
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="font-bold">{projects[selectedProject].title}</h3>
                            <p className="text-gray-500">Prototyping</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${projects[selectedProject].progress}%` }}
                                />
                            </div>
                            <p className="mt-2">Progress: {projects[selectedProject].progress}%</p>
                            <p className="text-red-500">Days Left: {projects[selectedProject].daysLeft}</p>
                        </div>
                    )}
                </div>

                {/* Client Messages */}
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold">Client Messages</h3>
                    <div className="mt-4">
                        <div className="border-b py-2">
                            <p className="font-semibold">Stephanie</p>
                            <p className="text-gray-500">I got your first assignment. It was quite good.</p>
                        </div>
                        <div className="border-b py-2">
                            <p className="font-semibold">Mark</p>
                            <p className="text-gray-500">Can you tell me about the progress of the project?</p>
                        </div>
                        <div className="py-2">
                            <p className="font-semibold">David</p>
                            <p className="text-gray-500">I'm waiting for your response.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
