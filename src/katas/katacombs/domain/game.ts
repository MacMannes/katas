import { Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';
import { groupBy } from '@utils/array';

export class Game {
    private readonly rooms: Record<string, Room> = {};

    constructor(
        private readonly ui: UserInterface,
        rooms: Room[],
    ) {
        const groupedRooms = groupBy(rooms, (room) => room.name);
        for (const name in groupedRooms) {
            const roomToAdd = groupedRooms[name];
            if (roomToAdd.length > 1) {
                throw new Error('Two different rooms with the same name are not allowed');
            }

            this.rooms[name] = roomToAdd[0];
        }
    }

    public start(): void {
        this.ui.displayRoom(this.rooms['start']);
    }
}
