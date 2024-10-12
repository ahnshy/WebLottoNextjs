// lib/model.ts
import * as tf from '@tensorflow/tfjs';
import { getAll } from '../database/db';
import { LotteryType } from '../types/lottery';

class DnnModel {
    private static instance: tf.LayersModel | null = null;

    private constructor() {}

    public static getInstance(): tf.LayersModel {
        if (!this.instance) {
            this.instance = this.createModel();
        }
        return this.instance;
    }

    private static createModel(): tf.LayersModel {
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
    }

    public static async trainModel(): Promise<tf.LayersModel> {
        const model = this.getInstance();

        const data: LotteryType[] = await getAll();

        const xs = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));
        const ys = tf.tensor2d(data.map(row => [row.drwtNo1, row.drwtNo2, row.drwtNo3, row.drwtNo4, row.drwtNo5, row.drwtNo6]));

        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 32,
        });

        return model;
    }

    public static predictNumbers(input: number[][]): number[][] {
        const model = this.getInstance();
        const tensorInput = tf.tensor2d(input);
        const prediction = model.predict(tensorInput) as tf.Tensor;
        return prediction.arraySync() as number[][];
    }
}

// Usage
export const trainModel = DnnModel.trainModel;
export const predictNumbers = DnnModel.predictNumbers;
