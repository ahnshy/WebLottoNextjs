import { MAX_LOTTO_NUMBER } from "@/app/types/lottery";

class LotteryNumberGenerator {
    private static instance: LotteryNumberGenerator;

    private constructor() {}

    public static getInstance(): LotteryNumberGenerator {
        if (!LotteryNumberGenerator.instance) {
            LotteryNumberGenerator.instance = new LotteryNumberGenerator();
        }
        return LotteryNumberGenerator.instance;
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public markovChainLotteryNumbers(): number[] {
        const numbers: Set<number> = new Set<number>();
        let currentNumber: number = this.getRandomInt(1, MAX_LOTTO_NUMBER);

        while (numbers.size < 6) {
            numbers.add(currentNumber);

            const step: number = Math.random() < 0.5 ? -1 : 1;
            currentNumber += step;

            if (currentNumber < 1) {
                currentNumber = 1;
            } else if (currentNumber > MAX_LOTTO_NUMBER) {
                currentNumber = MAX_LOTTO_NUMBER;
            }
        }

        return Array.from(numbers).sort((a, b) => a - b);
    }

    public monteCarloSimulation(trials: number): number[][] {
        const results: number[][] = [];

        for (let i = 0; i < trials; i++) {
            results.push(this.markovChainLotteryNumbers());
        }

        return results;
    }
}

// Usage monte Carlo Simulation
// const lotteryGenerator = LotteryNumberGenerator.getInstance();
// const trials = 1000;
// const simulations = lotteryGenerator.monteCarloSimulation(trials);

// console.log(simulations);
