import { Direction } from '@katas/katacombs/domain';

export class Connection {
    constructor(
        readonly direction: Direction,
        readonly roomName: string,
    ) {}

    public matches(direction: Direction, roomName?: string): boolean {
        return this.matchesDirection(direction) && this.matchesRoom(roomName);
    }

    public matchesDirection(direction: Direction): boolean {
        return this.direction === direction;
    }

    public matchesRoom(roomName?: string): boolean {
        if (!roomName) return true;

        return this.roomName === roomName;
    }
}
