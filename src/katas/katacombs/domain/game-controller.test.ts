import { beforeEach, describe, expect, it } from 'vitest';
import { createRooms, Game, GameController, NoOpUserInterface, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';

describe('GameController', () => {
    const rooms = createRooms();
    let ui: UserInterface;
    let controller: GameController;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        const game = new Game(rooms);
        controller = new GameController(game, ui);
    });

    describe('Start Game', () => {
        it('should print the title and description of the starting room', () => {
            controller.startGame();
            expect(ui.displayRoom).toHaveBeenCalledTimes(1);
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'start' }));
        });
    });
});
