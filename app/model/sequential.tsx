import * as tf from '@tensorflow/tfjs';
import { gwtAll } from '../database/db';
import { LotteryType } from "../types/lottery";

export const MAX_LOTTO_NUMBER = 45; // 로또 번호의 최대값

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

        // Normalize numbers
        const normalized = numbers.map(num => num / MAX_LOTTO_NUMBER);
        inputs.push(normalized);

        // Set output to the same normalized values for training
        outputs.push(normalized);
    }

    return {
        xs: tf.tensor2d(inputs),
        ys: tf.tensor2d(outputs),
    };
}

export async function trainModel(): Promise<tf.LayersModel> {
    const lottoData: LotteryType[] = [];
    const winNoData = await gwtAll();

    if (winNoData) {
        lottoData.push(winNoData);
    }

    const { xs, ys } = await preprocessData(lottoData);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 6, activation: 'sigmoid' }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    await model.fit(xs, ys, { epochs: 100 });
    return model;
}

// export async function GetExtractNumber(): Promise<tf.LayersModel> {
//
//     trainModel()
//     return model;
// }
