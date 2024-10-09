import { NextRequest, NextResponse } from "next/server"
import { insertData } from '../../../database/db';

export async  function GET(req: NextRequest){
    const results = [];

    for (let drwNo = 1; ; drwNo++) {
        const url = `https://dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for draw number ${drwNo}`);
            }
            const data = await response.json();

            if (data.returnValue === "fail") {
                console.log(`Stopping fetch at draw number ${drwNo} due to failure.`);
                break;
            }
            results.push(data);

        } catch (error) {
            console.error(`Error fetching data for draw number ${drwNo}:`, error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            results.push({drwNo, error: errorMessage});
            break;
        }
    }

    let res, numberStatus;
    try {
        await insertData(results);
        res = {
            message: 'sync all lotto lists success!',
            data: results
        }
        numberStatus = 200;
    } catch (error) {
        res = {
            message: 'error sync lotto list',
            data: error
        }
        numberStatus = 500;
    }

  return NextResponse.json(res, { status: numberStatus });
}
