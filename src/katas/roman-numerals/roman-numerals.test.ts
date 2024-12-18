import { describe, test } from 'vitest';

describe('RomanNumerals Kata', () => {
    test('Arabic to Roman', () => {
        const arabicToRoman: Record<number, string> = {
            1: 'I',
            4: 'IV',
            5: 'V',
        };

        Object.keys(arabicToRoman)
            .map(Number)
            .reverse()
            .forEach((key) => {
                const roman = arabicToRoman[key];
                console.log(roman);
            });
    });
});
