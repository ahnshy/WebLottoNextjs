import { NextRequest, NextResponse } from "next/server";
//import { getWinNo } from "@/app/database/db";
//import { trainModel } from "../../../model/sequential";
//import { MAX_LOTTO_NUMBER } from "../../../types/lottery";
//import * as tf from '@tensorflow/tfjs';

export async function GET(req: NextRequest): Promise<NextResponse> {
  let finalNumbers;
  // const model = await trainModel();
  //
  // const inputTensor = tf.randomNormal([1, 6]); // 랜덤 텐서
  //
  // let uniquePredictedNumbers: Set<number> = new Set();
  //
  // // 모델로부터 고유한 숫자 6개를 생성
  // while (uniquePredictedNumbers.size < 6) {
  //   const prediction = model.predict(inputTensor) as tf.Tensor;
  //   const predictedNumbers: number[] = Array.from(prediction.dataSync()).map(num => Math.round(num * MAX_LOTTO_NUMBER));
  //
  //   // 예측된 숫자를 Set에 추가하여 중복 제거
  //   predictedNumbers.forEach(num => {
  //     const boundedNum = Math.max(1, Math.min(num, MAX_LOTTO_NUMBER)); // 1~45 사이로 보정
  //     uniquePredictedNumbers.add(boundedNum);
  //   });
  // }
  //
  // finalNumbers = Array.from(uniquePredictedNumbers).sort((a, b) => a - b).slice(0, 6);


  const res = {
    message: 'Predict number from sequential model succeeded!',
    data: finalNumbers
  };
  return NextResponse.json(res, { status: 200 });
}
