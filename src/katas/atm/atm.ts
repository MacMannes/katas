export class ATM {
    withdraw(number: number): number {
        if (number < 10 || number > 500) {
            return -1;
        }

        return 1;
    }
}
