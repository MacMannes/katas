import { Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';
import { groupBy } from '@utils/array';

export class Game {
    private readonly roomsByName: Record<string, Room> = {};

    constructor(
        private readonly ui: UserInterface,
        rooms: Room[],
    ) {
        this.roomsByName = this.groupRooms(rooms);
    }

    private groupRooms(rooms: Room[]): Record<string, Room> {
        const result: Record<string, Room> = {};

        const groupedRooms = groupBy(rooms, (room) => room.name);
        for (const name in groupedRooms) {
            const roomToAdd = groupedRooms[name];
            if (roomToAdd.length > 1) {
                throw new Error('Two different rooms with the same name are not allowed');
            }

            result[name] = roomToAdd[0];
        }

        return result;
    }

    public start(): void {
        this.ui.displayRoom(this.roomsByName['start']);
    }
}
