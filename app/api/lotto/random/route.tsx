import { NextRequest, NextResponse } from "next/server";
import { MAX_LOTTO_NUMBER } from "../../../types/lottery";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const uniqueRandomNumbers: Set<number> = new Set();

    while (uniqueRandomNumbers.size < 6) {
        const randomNum = Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
        uniqueRandomNumbers.add(randomNum);
    }

    const randomNumbers = Array.from(uniqueRandomNumbers).sort((a, b) => a - b);

    const res = {
        message: 'Random numbers generated successfully!',
        data: randomNumbers
    };
    return NextResponse.json(res, { status: 200 });
}
