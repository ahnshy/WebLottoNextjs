import * as tf from '@tensorflow/tfjs';
import { getAll } from '../database/db';
import {MAX_LOTTO_NUMBER, LotteryType} from "../types/lottery";

let trainedModel: tf.LayersModel | null = null; // 전역 변수로 모델 저장

async function preprocessData(lottoData: LotteryType[]): Promise<{ xs: tf.Tensor; ys: tf.Tensor }> {
    const inputs: number[][] = [];
    const outputs: number[][] = [];

    for (const entry of lottoData) {
        const numbers = [
            entry.drwtNo1,
            entry.drwtNo2,
            entry.drwtNo3,
            entry.drwtNo4,
            entry.drwtNo5,
            entry.drwtNo6,
        ];

        const normalized = numbers.map(num => num / MAX_LOTTO_NUMBER);
        inputs.push(normalized);
        outputs.push(normalized);
    }

    return {
        xs: tf.tensor2d(inputs),
        ys: tf.tensor2d(outputs),
    };
}

export async function trainModel(): Promise<tf.LayersModel> {
    if (trainedModel) {
        return trainedModel;
    }

    const lottoData: LotteryType[] = await getAll();
    const { xs, ys } = await preprocessData(lottoData);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 6, activation: 'sigmoid' }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    await model.fit(xs, ys, { epochs: 100 });
    trainedModel = model;
    return model;
}
