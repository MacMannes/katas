import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestRooms, Game, GameController, NoOpUserInterface, UserInterface } from '@katas/katacombs/domain';
import { createMockedObject } from '@utils/test';
import { RoomRepository } from '@katas/katacombs/domain/model/room-repository';

describe('GameController', () => {
    const testRooms = createTestRooms();
    let ui: UserInterface;
    let controller: GameController;

    beforeEach(() => {
        ui = createMockedObject(NoOpUserInterface);
        const repository = new RoomRepository(testRooms);
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
            expect(ui.displayRoom).toHaveBeenCalledTimes(0);
        });

        it('should show something like "Nothing interesting" when looking in a specific direction with NO connection', () => {
            controller.look('WEST');

            expect(ui.displayMessage).toHaveBeenCalledWith(expect.stringContaining('Nothing interesting'));
            expect(ui.displayRoom).toHaveBeenCalledTimes(0);
        });

        it('should show "I see no ... here" when looking at something that is not here', () => {
            controller.look('keys');

            expect(ui.displayMessage).toHaveBeenCalledWith('I see no keys here.');
            expect(ui.displayRoom).toHaveBeenCalledTimes(0);
        });

        it('should show the description of the item when found', () => {
            controller.moveToDirection('NORTH');
            vi.resetAllMocks(); // Reset mocks, because we only wat to check the ui mock for the look command

            controller.look('keys');

            expect(ui.displayMessage).toHaveBeenCalledWith("It's a key ring with three rusty keys on it.");
            expect(ui.displayRoom).toHaveBeenCalledTimes(0);
        });
    });

    describe('Taking items', () => {
        it('should remove the item from the room', () => {
            controller.moveToDirection('NORTH');
            controller.take('keys');
        });
    });
});
