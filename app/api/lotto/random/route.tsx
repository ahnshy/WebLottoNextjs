import { NextRequest, NextResponse } from "next/server";
import { MAX_LOTTO_NUMBER } from "../../../types/lottery";

import { NextRequest, NextResponse } from "next/server";
import { MAX_LOTTO_NUMBER } from "../../../types/lottery";

// 난수 생성 함수
const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
    const uniqueRandomNumbers: Set<number> = new Set<number>();

    while (uniqueRandomNumbers.size < count) {
        const randomNum: number = Math.floor(Math.random() * max) + 1;
        uniqueRandomNumbers.add(randomNum);
    }

    return Array.from(uniqueRandomNumbers).sort((a, b) => a - b);
};

export async function GET(req: NextRequest): Promise<NextResponse> {
    const randomNumbers: number[] = generateUniqueRandomNumbers(6, MAX_LOTTO_NUMBER);

    const res = {
        message: 'Random numbers generated successfully!',
        data: randomNumbers
    };

    return NextResponse.json(res, { status: 200 });
}

// export async function GET(req: NextRequest): Promise<NextResponse> {
//     const uniqueRandomNumbers: Set<number> = new Set<number>();
//
//     while (uniqueRandomNumbers.size < 6) {
//         const randomNum = Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
//         uniqueRandomNumbers.add(randomNum);
//     }
//
//     const randomNumbers : number[] = Array.from(uniqueRandomNumbers).sort((a, b) => a - b);
//
//     const res = {
//         message: 'Random numbers generated successfully!',
//         data: randomNumbers
//     };
//     return NextResponse.json(res, { status: 200 });
// }

