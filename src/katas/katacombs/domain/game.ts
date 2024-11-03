import { Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/user-interface';

export class Game {
    constructor(
        private readonly ui: UserInterface,
        private readonly room: Room,
    ) {}

    public start(): void {
        this.ui.displayRoom(this.room);
    }
}
