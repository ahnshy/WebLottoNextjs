// lib/model.ts
import * as tf from '@tensorflow/tfjs';
import { getAll } from '../database/db';
import { LotteryType } from '../types/lottery';

export let trainedModel: tf.LayersModel;
export const createModel = (): tf.LayersModel => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 6, activation: 'softmax' }));
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });
    return model;
};

//export const trainModel = async (model: tf.LayersModel): Promise<void> => {
export const trainModel = async (): Promise<void> => {

    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 6, activation: 'softmax' }));
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    //const data: LotteryType[];
    const data: LotteryType[] = [];
    const winNoData =  await getAll();

    if (winNoData) {
        data.push(winNoData);
    }

    const xs = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));
    const ys = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));

    await model.fit(xs, ys, {
        epochs: 100,
        batchSize: 32,
    });

    return model;
};

export const predictNumbers = (model: tf.LayersModel): number[][] => {
    const input = tf.tensor2d([[1, 2, 3, 4, 5, 6]]);
    const prediction = model.predict(input) as tf.Tensor;
    return prediction.arraySync() as number[][]; // 예측 결과 반환
};
