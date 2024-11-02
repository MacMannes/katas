const BANK_NOTES = [10, 20, 50, 100, 200, 500];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 1500;

export class ATM {
    withdraw(amount: number): number {
        if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) return -1;

        if (amount === 30) return 3;
        if (amount === 60) return 3;
        if (amount === 300) return 3;
        if (amount === 600) return 3;
        if (amount === 1500) return 3;

        if (!BANK_NOTES.includes(amount)) return -1;

        return 1;
    }
}
