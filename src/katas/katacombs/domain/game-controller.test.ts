import { beforeEach, describe, expect, it } from 'vitest';
import { createDefaultRooms, Game, GameController, NoOpUserInterface, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';

describe('GameController', () => {
    const defaultRooms = createDefaultRooms();
    let ui: UserInterface;
    let controller: GameController;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        const game = new Game(defaultRooms);
        controller = new GameController(game, ui);
    });

    describe('Start Game', () => {
        it('should print the title and description of the starting room', () => {
            controller.startGame();
            expect(ui.displayRoom).toHaveBeenCalledTimes(1);
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'start' }));
        });
    });

    describe('Move to another room', () => {
        it('should print the new room when the move was successful', () => {
            controller.moveToDirection('NORTH');
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'building' }));
        });

        it('should print a message the move could not be made', () => {
            controller.moveToDirection('WEST');
            expect(ui.displayMessage).toHaveBeenCalledWith(expect.stringContaining('no way'));
        });

        it('should print the current room when the move could not be made', () => {
            controller.moveToDirection('WEST');
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'start' }));
        });
    });
});
