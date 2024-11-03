import { beforeEach, describe, expect, it } from 'vitest';
import { Game, NoOpUserInterface, Room, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';

describe('Game', () => {
    const rooms = createRooms();
    let ui: UserInterface;
    let game: Game;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        game = new Game(ui, rooms);
    });

    describe('constructor', () => {
        it('Two rooms with the same name are not allowed', () => {
            const room = new Room('start', '', '');
            expect(() => new Game(ui, [room, room])).toThrowError();
        });
    });

    describe('start', () => {
        it('should print the title and description of the starting room', () => {
            game.start();
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'start' }));
        });
    });
});

function createRooms(): Room[] {
    return [
        new Room('nowhere', 'Nowhere', "You're on the road to Nowhere"),
        new Room(
            'start',
            'Lost in Shoreditch',
            'You are standing at the end of a brick lane before a small brick building called "The Old Truman Brewery".' +
                'Around you is a forest of restaurants and bars. A small stream of crafted beer flows out of the building and down a gully.',
        ),
        new Room(
            'building',
            'Inside the building',
            'Inside the building' +
                'you are inside the main room of the truman brewery. there is a strong smell of hops and a dozen empty casks',
        ),
    ];
}
