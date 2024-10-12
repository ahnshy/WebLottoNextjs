import {MAX_LOTTO_NUMBER} from "@/app/types/lottery";

export const generateGianellaNumbers = () => {
    const numbers = [];
    const baseNumbers = Array.from({ length: MAX_LOTTO_NUMBER }, (_, i) => i + 1);

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * baseNumbers.length);
        numbers.push(baseNumbers[randomIndex]);
        baseNumbers.splice(randomIndex, 1);
    }

    return numbers.sort((a, b) => a - b);
};
