import { Direction } from '@katas/katacombs/domain';

export class Connection {
    public readonly description?: string;

    constructor(
        readonly direction: Direction,
        readonly roomName: string,
        options?: ConnectionOptions,
    ) {
        this.description = options?.description;
    }

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

export type ConnectionOptions = {
    description?: string;
};
