import { NextRequest, NextResponse } from "next/server";
import { MAX_LOTTO_NUMBER } from "../../../types/lottery";

// LCG algorithm based randomize class
class LCG {
    private seed: number;
    private modulus: number;
    private multiplier: number;
    private increment: number;

    constructor(seed: number) {
        this.seed = seed;
        this.modulus = 2147483647; // 2^31 - 1
        this.multiplier = 48271; // LCG multiplier
        this.increment = 0; // LCG increment
    }

    private next(): number {
        this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed;
    }

    public random(max: number): number {
        return Math.floor(this.next() / this.modulus * max) + 1;
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    const randomNumbers: number[] = generateUniqueRandomNumbers(6, MAX_LOTTO_NUMBER);

    const res = {
        message: 'Random numbers generated successfully!',
        data: randomNumbers
    };

    return NextResponse.json(res, { status: 200 });
}

const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
    const uniqueRandomNumbers: Set<number> = new Set<number>();
    const lcg = new LCG(Date.now()); // 현재 시간으로 시드 초기화

    while (uniqueRandomNumbers.size < count) {
        const randomNum: number = lcg.random(max);
        uniqueRandomNumbers.add(randomNum);
    }

    return Array.from(uniqueRandomNumbers).sort((a, b) => a - b);
};

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

