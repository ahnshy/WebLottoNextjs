import { NextRequest, NextResponse } from "next/server";
import {MAX_LOTTO_NUMBER, trainModel} from "../../../model/sequential";

export async  function GET(req: NextRequest){

    const randomInput = Array.from({ length: 6 }, () => Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1);

    const res = {
        message: 'predict number al sequential model based succeed!',
        data: randomInput
    }
    return NextResponse.json(res, { status: 200 });
}
