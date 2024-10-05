// lib/model.ts
import * as tf from '@tensorflow/tfjs';
import { getAll } from '../database/db';
import { LotteryType } from '../types/lottery';

let trainDnnModel: tf.LayersModel | null = null; // 전역 변수로 모델 저장

export const createModel = (): tf.LayersModel => {
    if (trainDnnModel) {
        return trainDnnModel;
    }
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 6, activation: 'softmax' }));
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    trainDnnModel = model;
    return trainDnnModel;
};

//export const trainModel = async (model: tf.LayersModel): Promise<void> => {
export const trainModel = async (): Promise<tf.LayersModel> => {

    if (trainDnnModel) {
        return trainDnnModel;
    }

    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 6, activation: 'softmax' }));
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    //const data: LotteryType[] = [];
    const data: LotteryType[]=  await getAll();

    const xs = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));
    const ys = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));

    await model.fit(xs, ys, {
        epochs: 100,
        batchSize: 32,
    });

    trainDnnModel = model;
    return trainDnnModel;
};

export const predictNumbers = (model: tf.LayersModel): number[][] => {
    const input = tf.tensor2d([[1, 2, 3, 4, 5, 6]]);
    const prediction = model.predict(input) as tf.Tensor;
    return prediction.arraySync() as number[][]; // 예측 결과 반환
};
