const BANK_NOTES = [500, 200, 100, 50, 20, 10];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 1500;

export class ATM {
    withdraw(amount: number): number {
        if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) return -1;

        let amountLeft = amount;
        let numberOfNotes = 0;
        let noteIndex = 0;

        while (amountLeft != 0) {
            const note = BANK_NOTES[noteIndex];
            if (amountLeft - note >= 0) {
                amountLeft -= note;
                numberOfNotes++;
            } else {
                noteIndex++;
                if (noteIndex >= BANK_NOTES.length) break;
            }
        }

        if (amountLeft === 0) return numberOfNotes;

        return -1;
    }
}
