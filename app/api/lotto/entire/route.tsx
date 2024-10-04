import { NextRequest, NextResponse } from "next/server";
import {getAll} from "@/app/database/db";
import {LotteryType} from "@/app/types/lottery";

export async  function GET(req: NextRequest){
    let response: LotteryType[] | string;
    try {
        const lotteryList: LotteryType[] = await getAll();
        response = lotteryList;
    } catch (error) {
        console.error(error);
        response = 'Internal Server Error';
    }

    const res = {
        message: 'Entire number list succeed!',
        predictedNumbers: response
    }
    return NextResponse.json(res, { status: 200 });
}
