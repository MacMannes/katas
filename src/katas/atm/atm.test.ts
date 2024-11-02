import { describe, expect, it } from 'vitest';
import { ATM } from '@katas/atm/atm';

/**
 * Nominal values 10, 20, 50, 100, 200 and 500 dollars.
 */

describe('ATM Kata', () => {
    const atm = new ATM();

    it('should return -1 when amount is out of range', () => {
        expect(atm.withdraw(9)).toBe(-1);
        expect(atm.withdraw(-1)).toBe(-1);
        expect(atm.withdraw(501)).toBe(-1);
    });

    it('should return 1 for when one of the nominal values are withdrawn', () => {
        expect(atm.withdraw(10)).toBe(1);
        expect(atm.withdraw(20)).toBe(1);
        expect(atm.withdraw(50)).toBe(1);
        expect(atm.withdraw(100)).toBe(1);
        expect(atm.withdraw(20)).toBe(1);
        expect(atm.withdraw(500)).toBe(1);
    });
});
