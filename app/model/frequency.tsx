import { LotteryType } from "@/app/types/lottery";

class LotteryModel {
    private static instance: LotteryModel | null = null;
    private frequency: Record<number, number> = {};
    private winningNumbers: LotteryType[] = [];

    private constructor() {}

    public static getInstance(): LotteryModel {
        if (!LotteryModel.instance) {
            LotteryModel.instance = new LotteryModel();
        }
        return LotteryModel.instance;
    }

    public setWinningNumbers(winningNumbers: LotteryType[]): void {
        this.winningNumbers = winningNumbers;
        this.calculateFrequency();
    }

    private calculateFrequency(): void {
        this.frequency = {};
        for (let i = 1; i <= 45; i++) {
            this.frequency[i] = 0;
        }

        this.winningNumbers.forEach(({ drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6 }) => {
            [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6].forEach((number) => {
                this.frequency[number] = (this.frequency[number] || 0) + 1;
            });
        });
    }

    public getFrequency(): Record<number, number> {
        return this.frequency;
    }

    public generatePredictedNumbers(): number[] {
        const totalDraws = Object.values(this.frequency).reduce((sum, count) => sum + count, 0);
        const probabilities = Object.entries(this.frequency).map(([number, count]) => ({
            number: parseInt(number),
            probability: count / totalDraws,
        }));

        const predictedNumbers: number[] = [];
        while (predictedNumbers.length < 6) {
            const randomIndex = Math.floor(Math.random() * probabilities.length);
            const randomNum = probabilities[randomIndex].number;
            if (!predictedNumbers.includes(randomNum)) {
                predictedNumbers.push(randomNum);
            }
        }

        return predictedNumbers.sort((a, b) => a - b);
    }

    public generatePredictedNumbersEx(): number[] {
        const totalDraws = Object.values(this.frequency).reduce((sum, count) => sum + count, 0);
        const probabilities = Object.entries(this.frequency).map(([number, count]) => ({
            number: parseInt(number),
            weight: count,
        }));

        const predictedNumbers: number[] = [];

        while (predictedNumbers.length < 6) {
            const totalWeight = probabilities.reduce((sum, { weight }) => sum + weight, 0);
            const randomWeight = Math.random() * totalWeight;

            let cumulativeWeight = 0;
            for (const { number, weight } of probabilities) {
                cumulativeWeight += weight;
                if (randomWeight <= cumulativeWeight) {
                    if (!predictedNumbers.includes(number)) {
                        predictedNumbers.push(number);
                    }
                    break;
                }
            }
        }

        return predictedNumbers.sort((a, b) => a - b);
    }
}

// usage example code
// const lotteryModel = LotteryModel.getInstance();
// const frequency = lotteryModel.getFrequency();
// const predictedNumbers = lotteryModel.generatePredictedNumbers();
// const predictedNumbersEx = lotteryModel.generatePredictedNumbersEx();
