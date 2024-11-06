import { Connection, Direction, oppositeOf } from '@katas/katacombs/domain';

export class Room {
    readonly connections: Connection[] = [];

    constructor(
        readonly name: string,
        readonly title: string,
        readonly description: string,
    ) {}

    public addConnection(direction: Direction, roomName: string) {
        this.connections.push(new Connection(direction, roomName));
    }

    public findConnection(direction: Direction, roomName?: string): Connection | undefined {
        return this.connections.find((it) => it.matches(direction, roomName));
    }
}

export function connectRooms(from: Room, to: Room, direction: Direction) {
    from.addConnection(direction, to.name);
    to.addConnection(oppositeOf(direction), from.name);
}
