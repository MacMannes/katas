import { beforeEach, describe, expect, it } from 'vitest';
import { Game, NoOpUserInterface, Room, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';

describe('Game', () => {
    const room = createRoom();
    let ui: UserInterface;
    let game: Game;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        game = new Game(ui, room);
    });

    describe('start', () => {
        it('should print the title and description of the first room', () => {
            game.start();
            expect(ui.displayRoom).toHaveBeenCalledWith(room);
        });
    });
});

function createRoom(): Room {
    return new Room(
        'start',
        'Lost in Shoreditch',
        'You are standing at the end of a brick lane before a small brick building called the old truman brewery.\n' +
            'Around you is a forest of restaurants and bars. A small stream of crafted beer flows out of the building and down a gully.',
    );
}
