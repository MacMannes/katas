import { Game } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';

export class GameController {
    constructor(
        private readonly game: Game,
        private readonly ui: UserInterface,
    ) {}

    public startGame(): void {
        this.ui.displayRoom(this.game.currentRoom);
    }
}
