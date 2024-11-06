import { Direction } from '@katas/katacombs/domain';

export class Connection {
    constructor(
        readonly direction: Direction,
        readonly roomName: string,
    ) {}

    public matchesDirection(direction: Direction): boolean {
        return this.direction === direction;
    }
}
