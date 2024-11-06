import { Connection, ConnectionOptions, Direction, oppositeOf } from '@katas/katacombs/domain';

export class Room {
    readonly connections: Connection[] = [];

    constructor(
        public readonly name: string,
        public readonly title: string,
        public readonly description: string,
    ) {}

    public addConnection(direction: Direction, roomName: string, options?: ConnectionOptions) {
        this.connections.push(new Connection(direction, roomName, options));
    }

    public findConnection(direction: Direction, roomName?: string): Connection | undefined {
        return this.connections.find((it) => it.matches(direction, roomName));
    }
}

export type RoomToConnect = {
    room: Room;
    description?: string;
};

export function connectRooms(from: RoomToConnect, to: RoomToConnect, direction: Direction) {
    from.room.addConnection(direction, to.room.name, { description: from.description });
    to.room.addConnection(oppositeOf(direction), from.room.name, { description: to.description });
}
