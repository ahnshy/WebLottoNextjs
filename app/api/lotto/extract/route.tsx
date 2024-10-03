import { NextRequest, NextResponse } from "next/server";
import {gwtAll} from "@/app/database/db";
import {MAX_LOTTO_NUMBER, model, trainModel} from "../../../model/sequential";
import * as tf from '@tensorflow/tfjs';

export async  function GET(req: NextRequest){

    if (!model) {
        model = await trainModel(); // 모델이 없으면 학습
    }

    // 입력값을 가져오기 (이 경우 과거 로또 번호의 평균을 사용)
    const inputData = await gwtAll(); // 모든 과거 데이터 가져오기
    const { xs } = await preprocessData(inputData);

    // 과거 데이터에서 하나의 샘플을 선택하여 예측에 사용
    const inputTensor = xs.slice([0, 0], [1, 6]); // 첫 번째 샘플을 사용

    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictedNumbers = Array.from(prediction.dataSync()).map(num => Math.round(num * MAX_LOTTO_NUMBER));

    // 중복 제거 및 정렬
    const uniquePredictedNumbers = Array.from(new Set(predictedNumbers)).sort((a, b) => a - b).slice(0, 6);

    const res = {
        message: 'predict number al sequential model based succeed!',
        predictedNumbers: uniquePredictedNumbers
    }
    return NextResponse.json(res, { status: 200 });
}
