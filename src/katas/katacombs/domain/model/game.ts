import { Connection, oppositeOf, Room } from '@katas/katacombs/domain';
import { groupBy } from '@utils/array';

export class Game {
    private readonly roomsByName: Record<string, Room> = {};
    private _currentRoom: Room;

    constructor(rooms: Room[]) {
        this.validateRooms(rooms);
        this.roomsByName = this.groupRooms(rooms);
        this.validateConnections();
        this._currentRoom = this.roomsByName['start'];
    }

    get currentRoom(): Room {
        return this._currentRoom;
    }

    private set currentRoom(value: Room) {
        this._currentRoom = value;
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
        this.ensureRoomExists(rooms, 'start');
        this.ensureUniqueProperty(rooms, 'name');
        this.ensureUniqueProperty(rooms, 'title');
    }

    private ensureUniqueProperty(rooms: Room[], propertyName: keyof Room) {
        const uniqueValues = new Set(rooms.map((room) => room[propertyName]));
        if (uniqueValues.size !== rooms.length) {
            throw new Error(`Rooms should have unique ${propertyName}s`);
        }
    }

    private validateConnections() {
        for (const room of Object.values(this.roomsByName)) {
            this.validateConnectionsOfRoom(room);
        }
    }

    private validateConnectionsOfRoom(room: Room) {
        const roomName = room.name;

        room.connections.forEach((connection) => {
            this.validateConnection(connection, roomName);
        });
    }

    private validateConnection(connection: Connection, fromRoomName: string) {
        const connectedRoomName = connection.roomName;
        const connectionDescription = `connection from ${fromRoomName} to ${connectedRoomName}`;

        const connectedRoom = this.roomsByName[connectedRoomName];
        if (!connectedRoom) {
            throw new Error(`Invalid ${connectionDescription}. Room ${connectedRoomName} does not exist.`);
        }

        const reversedConnection = connectedRoom.findConnection(oppositeOf(connection.direction), fromRoomName);
        if (!reversedConnection) {
            throw new Error(`The ${connectionDescription} is not reversed.`);
        }
    }

    private ensureRoomExists(rooms: Room[], roomName: string) {
        const room = rooms.find((it) => it.name === roomName);
        if (!room) throw new Error(`A room with the name "${roomName}" does not exist.`);
    }
}
