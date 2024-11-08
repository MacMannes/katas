import { Direction, Game, isDirection, Item } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';

export class GameController {
    constructor(
        private readonly game: Game,
        private readonly ui: UserInterface,
    ) {}

    public startGame(): void {
        this.displayCurrentRoom();
    }

    public moveToDirection(direction: Direction) {
        const newRoom = this.game.moveToDirection(direction);
        if (!newRoom) {
            this.ui.displayMessage('There is no way to go that direction.');
        }
        this.displayCurrentRoom();
    }

    public look(subject?: Direction | string) {
        if (!subject) this.displayCurrentRoom();

        if (isDirection(subject)) {
            const message = this.lookInDirection(subject);
            this.ui.displayMessage(message);
            return;
        }

        //Check for item in room
        const item = this.game.getCurrentRoom().findItem(subject);
        if (item) {
            this.ui.displayMessage(item.descriptions.look);
            return;
        }

        this.ui.displayMessage(`I see no ${subject} here.`);
    }

    private lookInDirection(direction: Direction) {
        const connection = this.game.getCurrentRoom().findConnection(direction);
        return connection?.description ?? 'Nothing interesting to look at there.';
    }

    private displayCurrentRoom() {
        this.ui.displayRoom(this.game.getCurrentRoom());
    }
}
