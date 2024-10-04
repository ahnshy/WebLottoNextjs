// 당첨 번호의 출현 빈도를 계산하는 함수
import {LotteryType} from "@/app/types/lottery";

export const GetFrequencyNumber = (winningNumbers: LotteryType[]): Record<number, number> => {
    const frequency: Record<number, number> = {};

    winningNumbers.forEach(({ drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6 }) => {
        [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6].forEach((number) => {
            frequency[number] = (frequency[number] || 0) + 1;
        });
    });

    return frequency;
};

export const calculateNumberFrequency = (winningNumbers: LotteryType[]): Record<number, number> => {
    const frequency: Record<number, number> = {};

    for (let i = 1; i <= 45; i++) {
        frequency[i] = 0;
    }

    winningNumbers.forEach(({ drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6 }) => {
        [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6].forEach((number) => {
            frequency[number] = (frequency[number] || 0) + 1;
        });
    });

    return frequency;
};

// 예측 번호를 생성하는 함수
export const generatePredictedNumbers = (frequency: Record<number, number>): number[] => {
    const totalDraws = Object.values(frequency).reduce((sum, count) => sum + count, 0);

    const probabilities = Object.entries(frequency).map(([number, count]) => ({
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
};


// 출현 가중치 부여
export const generatePredictedNumbersEx = (frequency: Record<number, number>): number[] => {
    const totalDraws = Object.values(frequency).reduce((sum, count) => sum + count, 0);

    // 각 번호와 그에 해당하는 확률을 배열로 변환
    const probabilities = Object.entries(frequency).map(([number, count]) => ({
        number: parseInt(number),
        weight: count, // 출현 횟수를 가중치로 사용
    }));

    const predictedNumbers: number[] = [];

    while (predictedNumbers.length < 6) {
        const totalWeight = probabilities.reduce((sum, { weight }) => sum + weight, 0);
        const randomWeight = Math.random() * totalWeight;

        let cumulativeWeight = 0;
        for (const { number, weight } of probabilities) {
            cumulativeWeight += weight;
            if (randomWeight <= cumulativeWeight) {
                // 중복을 방지하기 위해 번호가 이미 선택되었는지 체크
                if (!predictedNumbers.includes(number)) {
                    predictedNumbers.push(number);
                }
                break; // 번호를 선택한 후 루프 종료
            }
        }
    }

    return predictedNumbers.sort((a, b) => a - b);
};

