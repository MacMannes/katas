import { beforeEach, describe, expect, it } from 'vitest';
import { createDefaultRooms, Game, GameController, NoOpUserInterface, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';
import { RoomRepository } from '@katas/katacombs/domain/model/room-repository';

describe('GameController', () => {
    const defaultRooms = createDefaultRooms();
    let ui: UserInterface;
    let controller: GameController;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        const repository = new RoomRepository(defaultRooms);
        const game = new Game(repository);
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

    describe('Looking', () => {
        it('should show the description of the room when looking in no specific direction', () => {
            controller.look();
            expect(ui.displayRoom).toHaveBeenCalledWith(expect.objectContaining({ name: 'start' }));
        });

        it('should show the description when looking in a specific direction with a connection', () => {
            controller.look('NORTH');
            expect(ui.displayMessage).toHaveBeenCalledWith(
                'I see a brick building with a sign saying "Truman Brewery and a wooden white door".',
            );
        });

        it('should show something like "Nothing interesting" when looking in a specific direction with NO connection', () => {
            controller.look('WEST');
            expect(ui.displayMessage).toHaveBeenCalledWith(expect.stringContaining('Nothing interesting'));
        });
    });
});
