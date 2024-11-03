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
        it('Should not allow ewo rooms with the same name', () => {
            const room = new Room('start', '', '');
            expect(() => new Game(ui, [room, room])).toThrowError();
        });

        it('Should not allow two rooms with the same title', () => {
            const rooms = [new Room('room1', 'Room', ''), new Room('room2', 'Room', '')];
            expect(() => new Game(ui, rooms)).toThrowError();
        });

        it('should not allow connections to rooms that does not exist', () => {
            const room1 = new Room('room1', 'Room1', '');
            const room2 = new Room('room2', 'Room2', '');
            room1.addConnection('NORTH', 'room3');

            const rooms = [room1, room2];
            expect(() => new Game(ui, rooms)).toThrowError();
        });

        it('should not allow non-traversable connections to rooms', () => {
            const room1 = new Room('room1', 'Room1', '');
            const room2 = new Room('room2', 'Room2', '');
            room1.addConnection('NORTH', room1.name);

            const rooms = [room1, room2];
            expect(() => new Game(ui, rooms)).toThrowError();
        });
    });

    describe('start', () => {
        it('should print the title and description of the starting room', () => {
            game.start();
            expect(ui.displayRoom).toHaveBeenCalledTimes(1);
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
