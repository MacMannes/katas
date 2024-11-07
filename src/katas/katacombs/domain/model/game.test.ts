import { beforeEach, describe, expect, it } from 'vitest';
import { Game, Room, RoomRepository } from '@katas/katacombs/domain';

describe('Game', () => {
    describe('Move to a new room', () => {
        const room1 = new Room('start', 'Room 1', '');
        const room2 = new Room('room2', 'Room 2', '');
        room1.addConnection('SOUTH', room2);
        room2.addConnection('NORTH', room1);
        let game: Game;

        beforeEach(() => {
            const repository = new RoomRepository([room1, room2]);
            game = new Game(repository);
        });

        it('should return the new room, if the move was successful', () => {
            const result = game.moveToDirection('SOUTH');
            expect(result).toBe(room2);
        });

        it('should set the current room to the new room, if the move was successful', () => {
            game.moveToDirection('SOUTH');
            expect(game.getCurrentRoom()).toBe(room2);
        });

        it('should return undefined, if the move could not be made', () => {
            const result = game.moveToDirection('NORTH');
            expect(result).toBe(undefined);
        });

        it('should keep the current room, if the move could not be made', () => {
            game.moveToDirection('NORTH');
            expect(game.getCurrentRoom()).toBe(room1);
        });
    });
});
