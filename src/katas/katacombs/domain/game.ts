import { Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';

export class Game {
    constructor(
        private readonly ui: UserInterface,
        private readonly rooms: Room[],
    ) {}

    public start(): void {
        this.ui.displayRoom(this.rooms[0]);
    }
}
