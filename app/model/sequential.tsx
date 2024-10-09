import * as tf from '@tensorflow/tfjs';
import { getAll } from '../database/db';
import { MAX_LOTTO_NUMBER, LotteryType } from "../types/lottery";

class LottoModel {
    private static instance: LottoModel | null = null;
    private trainedModel: tf.LayersModel | null = null;

    private constructor() {}

    public static getInstance(): LottoModel {
        if (!LottoModel.instance) {
            LottoModel.instance = new LottoModel();
        }
        return LottoModel.instance;
    }

    private async preprocessData(lottoData: LotteryType[]): Promise<{ xs: tf.Tensor; ys: tf.Tensor }> {
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
            outputs.push(normalized); // 여기서 ys는 입력과 동일하므로, 추후에 수정할 수 있음
        }

        return {
            xs: tf.tensor2d(inputs),
            ys: tf.tensor2d(outputs),
        };
    }

    public async trainModel(): Promise<tf.LayersModel> {
        if (this.trainedModel) {
            return this.trainedModel;
        }

        const lottoData: LotteryType[] = await getAll();
        const { xs, ys } = await this.preprocessData(lottoData);

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [6] }));
        model.add(tf.layers.dense({ units: 6, activation: 'sigmoid' }));

        model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

        await model.fit(xs, ys, { epochs: 100 });
        this.trainedModel = model;
        return model;
    }
}

// usage example
// const lottoModel = LottoModel.getInstance();
// lottoModel.trainModel().then(model => {
//     console.log("모델이 성공적으로 훈련되었습니다.", model);
// });
