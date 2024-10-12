import { MAX_LOTTO_NUMBER } from "@/app/types/lottery";

class GianellaPattern {
    private static instance: GianellaPattern;

    private constructor() {}

    public static getInstance(): GianellaPattern {
        if (!GianellaPattern.instance) {
            GianellaPattern.instance = new GianellaPattern();
        }
        return GianellaPattern.instance;
    }

    public generateNumbers(): number[] {
        const numbers: number[] = [];
        const baseNumbers: number[] = Array.from({ length: MAX_LOTTO_NUMBER }, (_, i) => i + 1);

        for (let i = 0; i < 6; i++) {
            const randomIndex: number = Math.floor(Math.random() * baseNumbers.length);
            numbers.push(baseNumbers[randomIndex]);
            baseNumbers.splice(randomIndex, 1); // Remove the number to avoid duplicates
        }

        return numbers.sort((a, b) => a - b); // Sort the numbers
    }
}

export default GianellaPattern;
