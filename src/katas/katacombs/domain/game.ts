import { oppositeDirectionOf, Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';
import { groupBy } from '@utils/array';

export class Game {
    private readonly roomsByName: Record<string, Room> = {};

    constructor(
        private readonly ui: UserInterface,
        rooms: Room[],
    ) {
        this.validateRooms(rooms);
        this.roomsByName = this.groupRooms(rooms);
    }

    public start(): void {
        this.ui.displayRoom(this.roomsByName['start']);
    }

    private groupRooms(rooms: Room[]): Record<string, Room> {
        const result: Record<string, Room> = {};

        const groupedRooms = groupBy(rooms, (room) => room.name);
        for (const name in groupedRooms) {
            const roomToAdd = groupedRooms[name];

            result[name] = roomToAdd[0];
        }

        return result;
    }

    private validateRooms(rooms: Room[]) {
        this.ensureUniqueProperty(rooms, 'name');
        this.ensureUniqueProperty(rooms, 'title');
        this.validateDirections(rooms);
    }

    private ensureUniqueProperty(rooms: Room[], propertyName: keyof Room) {
        const uniqueValues = new Set(rooms.map((room) => room[propertyName]));
        if (uniqueValues.size !== rooms.length) {
            throw new Error(`Rooms should have unique ${propertyName}s`);
        }
    }

    private validateDirections(rooms: Room[]) {
        rooms.forEach((room) => {
            const roomName = room.name;

            room.connections.forEach((connection) => {
                const connectedRoomName = connection.roomName;

                const connectedRoom = rooms.find((it) => it.name === connectedRoomName);
                if (!connectedRoom) {
                    throw new Error(
                        `Could not connect ${roomName} to ${connectedRoomName}, because room ${connectedRoomName} does not exist.`,
                    );
                }

                const reversedConnection = connectedRoom.connections.find(
                    (it) => it.roomName === roomName && it.direction === oppositeDirectionOf(connection.direction),
                );

                if (!reversedConnection) {
                    throw new Error(`Connection from ${roomName} to ${connectedRoomName} is not reversed.`);
                }
            });
        });
    }
}
