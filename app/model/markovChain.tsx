import {MAX_LOTTO_NUMBER} from "@/app/types/lottery";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function markovChainLotteryNumbers(): number[] {
    const numbers: Set<number> = new Set<number>();
    let currentNumber: number = getRandomInt(1, MAX_LOTTO_NUMBER);

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

//const lottoNumbers: number[] = markovChainLotteryNumbers();
//console.log("Get Number:", lottoNumbers);
