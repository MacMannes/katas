import { Connection, ConnectionOptions, Direction } from '@katas/katacombs/domain';

export class Room {
    readonly connections: Connection[] = [];

    constructor(
        public readonly name: string,
        public readonly title: string,
        public readonly description: string,
    ) {}

    public addConnection(direction: Direction, to: Room, options?: ConnectionOptions) {
        this.connections.push(new Connection(direction, to.name, options));
    }

    public findConnection(direction: Direction, roomName?: string): Connection | undefined {
        return this.connections.find((it) => it.matches(direction, roomName));
    }
}
