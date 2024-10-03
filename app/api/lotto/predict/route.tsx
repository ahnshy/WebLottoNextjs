import { NextRequest, NextResponse } from "next/server";
import {getWinNo} from "@/app/database/db";
import {MAX_LOTTO_NUMBER, trainModel} from "../../../model/sequential";
import * as tf from '@tensorflow/tfjs';

export async  function GET(req: NextRequest){

  const model = await trainModel();

  const randomInput = Array.from({ length: 6 }, () => Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1);
  const inputTensor = tf.tensor2d([randomInput.map(num => num / MAX_LOTTO_NUMBER)]);

  const prediction = model.predict(inputTensor) as tf.Tensor;
  const predictedNumbers = Array.from(prediction.dataSync()).map(num => Math.round(num * MAX_LOTTO_NUMBER));

  const uniquePredictedNumbers = Array.from(new Set(predictedNumbers)).sort((a, b) => a - b).slice(0, 6);

  const res = {
    message: 'predict number al sequential model based succeed!',
    data: uniquePredictedNumbers
  }
  return NextResponse.json(res, { status: 200 });
}
