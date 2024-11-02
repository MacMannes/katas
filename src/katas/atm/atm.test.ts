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
});
