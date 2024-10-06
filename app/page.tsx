import React from 'react';

export default function Home() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 사이드바 */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <nav className="mt-6">
                    <ul>
                        <li className="mb-4">In Progress</li>
                        <li className="mb-4">Upcoming</li>
                        <li className="mb-4">Total Projects</li>
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
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-bold">Web Designing</h3>
                        <p className="text-gray-500">Prototyping</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <p className="mt-2">Progress: 60%</p>
                        <p className="text-red-500">2 Days Left</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-bold">Web Designing</h3>
                        <p className="text-gray-500">Prototyping</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <p className="mt-2">Progress: 50%</p>
                        <p className="text-red-500">2 Days Left</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-bold">Web Designing</h3>
                        <p className="text-gray-500">Prototyping</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="mt-2">Progress: 70%</p>
                        <p className="text-red-500">2 Days Left</p>
                    </div>
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
}
