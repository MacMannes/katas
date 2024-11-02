const BANK_NOTES = [10, 20, 50, 100, 200, 500];

export class ATM {
    withdraw(number: number): number {
        if (number < 10 || number > 500) {
            return -1;
        }

        if (!BANK_NOTES.includes(number)) return -1;

        return 1;
    }
}
