import { Connection, ConnectionOptions, Direction, Item } from '@katas/katacombs/domain';

export class Room {
    readonly connections: Connection[] = [];
    readonly items: Item[] = [];

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

    public addItem(item: Item) {
        this.items.push(item);
    }

    findItem(name?: string): Item | undefined {
        if (!name) return undefined;

        return this.items.find((item) => item.name == name);
    }
}
