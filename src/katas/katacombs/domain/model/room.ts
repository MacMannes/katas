import { Connection, Direction } from '@katas/katacombs/domain';

export class Room {
    readonly connections: Connection[] = [];

    constructor(
        readonly name: string,
        readonly title: string,
        readonly description: string,
    ) {}

    public addConnection(direction: Direction, roomName: string) {
        this.connections.push({
            direction,
            roomName,
        });
    }

    public findConnection(direction: Direction, roomName: string): Connection | undefined {
        return this.connections.find((it) => it.roomName === roomName && it.direction === direction);
    }
}
