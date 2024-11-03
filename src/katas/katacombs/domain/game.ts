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

    public start(): void {
        this.ui.displayRoom(this.roomsByName['start']);
    }

    private groupRooms(rooms: Room[]): Record<string, Room> {
        this.assertUniqueNames(rooms);
        this.assertUniqueTitles(rooms);

        const result: Record<string, Room> = {};

        const groupedRooms = groupBy(rooms, (room) => room.name);
        for (const name in groupedRooms) {
            const roomToAdd = groupedRooms[name];

            result[name] = roomToAdd[0];
        }

        return result;
    }

    private assertUniqueNames(rooms: Room[]) {
        const uniqueNames = new Set(rooms.map((it) => it.name));
        if (uniqueNames.size != rooms.length) {
            throw new Error('Two different rooms with the same name are not allowed');
        }
    }

    private assertUniqueTitles(rooms: Room[]) {
        const uniqueNames = new Set(rooms.map((it) => it.title));
        if (uniqueNames.size != rooms.length) {
            throw new Error('Two different rooms with the same title are not allowed');
        }
    }
}
