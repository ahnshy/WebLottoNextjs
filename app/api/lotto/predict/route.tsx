import { NextRequest, NextResponse } from "next/server";
import { getWinNo } from "@/app/database/db";
import { MAX_LOTTO_NUMBER, trainModel } from "../../../model/sequential";
import * as tf from '@tensorflow/tfjs';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const model = await trainModel();

  const inputTensor = tf.randomNormal([1, 6]); // 랜덤 텐서

  let uniquePredictedNumbers: number[] = [];

  // 모델로부터 고유한 숫자 6개를 생성
  while (uniquePredictedNumbers.length < 6) {
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictedNumbers: number[] = Array.from(prediction.dataSync()).map(num => Math.round(num * MAX_LOTTO_NUMBER));

    // 중복된 숫자를 제거
    uniquePredictedNumbers = Array.from(new Set(uniquePredictedNumbers.concat(predictedNumbers)))
        .map(num => Math.max(1, Math.min(num, MAX_LOTTO_NUMBER))) // 1~45 사이로 보정
        .sort((a, b) => a - b); // 정렬

    // 6개로 제한
    uniquePredictedNumbers = uniquePredictedNumbers.slice(0, 6);
  }

  const res = {
    message: 'Predict number from sequential model succeeded!',
    data: uniquePredictedNumbers
  };
  return NextResponse.json(res, { status: 200 });
}
