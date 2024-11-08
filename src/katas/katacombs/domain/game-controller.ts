import { Direction, Game, isDirection, Item, Room } from '@katas/katacombs/domain/model';
import { UserInterface } from '@katas/katacombs/domain/ui';

export class GameController {
    constructor(
        private readonly game: Game,
        private readonly ui: UserInterface,
    ) {}

    public startGame(): void {
        this.displayCurrentRoom();
    }

    public getCurrentRoom(): Room {
        return this.game.getCurrentRoom();
    }

    public moveToDirection(direction: Direction) {
        const newRoom = this.game.moveToDirection(direction);
        if (!newRoom) {
            this.ui.displayMessage('There is no way to go that direction.');
        }
        this.displayCurrentRoom();
    }

    public look(subject?: Direction | string) {
        if (!subject) {
            this.displayCurrentRoom();
            return;
        }

        const message = this.getMessageForLookingAt(subject);
        this.ui.displayMessage(message);
    }

    public take(itemName: string) {
        const itemNameToLookup = itemName.toLowerCase();
        const item = this.getCurrentRoom().findItem(itemNameToLookup);
        if (!item) {
            this.ui.displayMessage(`Can't find ${itemNameToLookup} here.`);
            return;
        }

        this.transferItemFromRoomToInventory(item);
        this.ui.displayMessage('OK.');
    }

    public getInventory(): Item[] {
        return [
            {
                name: 'keys',
                descriptions: {
                    inventory: '',
                    room: '',
                    look: '',
                },
            },
        ];
    }

    private getMessageForLookingAt(subject: string): string {
        if (isDirection(subject)) {
            return this.getMessageForLookingInDirection(subject);
        }

        return this.getMessageForLookingAtItem(subject) ?? `I see no ${subject} here.`;
    }

    private getMessageForLookingInDirection(direction: Direction): string {
        const connection = this.getCurrentRoom().findConnection(direction);
        return connection?.description ?? 'Nothing interesting to look at there.';
    }

    private getMessageForLookingAtItem(itemName: string): string | undefined {
        const item = this.getCurrentRoom().findItem(itemName);
        if (item) {
            return item.descriptions.look;
        }
    }

    private transferItemFromRoomToInventory(item: Item) {
        this.getCurrentRoom().removeItem(item);
    }

    private displayCurrentRoom() {
        this.ui.displayRoom(this.getCurrentRoom());
    }
}
