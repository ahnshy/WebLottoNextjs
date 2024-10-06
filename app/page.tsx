"use client"; // 이 파일이 Client Component임을 명시합니다.

import React, { useState, useEffect } from 'react';

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
    const [lottoDraws, setLottoDraws] = useState<{ round: number; numbers: number[] }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [drawCount, setDrawCount] = useState<number>(0);

    const handleProjectClick = (index: number) => {
        setSelectedProject(index);
    };

    const fetchLottoNumbers = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetch('/api/lotto/random'); // 로또 번호를 가져오는 API 엔드포인트
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDrawCount(prevCount => prevCount + 1);
            // 새 로또 회차를 추가합니다.
            setLottoDraws(prevDraws => [
                { round: drawCount + 1, numbers: data.data },
                ...prevDraws, // 가장 최근의 회차가 위에 오도록 배열 순서를 변경
            ]);
        } catch (error) {
            setError('Failed to fetch lotto numbers');
            console.error('Failed to fetch lotto numbers:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetLottoDraws = () => {
        setLottoDraws([]);
        setDrawCount(0);
    };

    useEffect(() => {
        fetchLottoNumbers();
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    // 공 색상을 결정하는 함수
    const getBallColor = (number: number): string => {
        if (number <= 10) return '#fbc400'; // 10 이하
        if (number <= 20) return '#69c8f2'; // 10~20
        if (number <= 30) return '#ff7272'; // 20~30
        if (number <= 40) return '#aaa'; // 30~40
        return '#b0d840'; // 40~50
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
            <main className="flex-1 p-6 overflow-y-auto">
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

                {/* 로또 번호 출력 */}
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold">Lotto Prediction Numbers</h3>
                    <div className="mt-2 flex flex-col">
                        <div className="flex justify-between mb-4">
                            <button
                                onClick={resetLottoDraws}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Reset Draws
                            </button>
                            <button
                                onClick={fetchLottoNumbers}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Fetch More Numbers
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {loading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="loader border-t-transparent border-solid border-4 border-gray-300 rounded-full w-16 h-16 animate-spin"></div>
                                </div>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                lottoDraws.map((draw) => {
                                    const sum = draw.numbers.reduce((acc, num) => acc + num, 0);
                                    return (
                                        <div key={draw.round} className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                            <h4 className="font-semibold">Round {draw.round}</h4>
                                            <div className="flex gap-2">
                                                {draw.numbers.map((number) => (
                                                    <div
                                                        key={number}
                                                        className="flex items-center justify-center w-12 h-12 rounded-full"
                                                        style={{ backgroundColor: getBallColor(number), color: 'white' }}
                                                    >
                                                        {number}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="font-semibold">Sum: {sum}</span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Client Messages */}
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold">Client Messages</h3>
                    <div className="mt-4">
                        <p className="text-gray-500">Here you can display additional information or messages.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
