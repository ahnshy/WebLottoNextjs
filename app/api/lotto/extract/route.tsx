import { NextRequest, NextResponse } from "next/server";
//import {getAll} from "@/app/database/db";
//import {calculateNumberFrequency, generatePredictedNumbersEx} from "@/app/model/frequency";
//import {LotteryType} from "@/app/types/lottery";


export async  function GET(req: NextRequest){
    let response;
    //
    // try {
    //         const lotteryList: LotteryType[] = await getAll();
    //         const frequency = calculateNumberFrequency(lotteryList);
    //         response = generatePredictedNumbersEx(frequency);
    // } catch (error) {
    //     console.error(error);
    //     response = 'Internal Server Error';
    // }
     const res = {
         message: 'Frequency numbers based predict succeed!',
         predictedNumbers: response
    }
    return NextResponse.json(res, { status: 200 });
}
