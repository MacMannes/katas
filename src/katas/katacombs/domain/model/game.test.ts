import { describe, expect, it } from 'vitest';
import { connectRooms, Game, Room } from '@katas/katacombs/domain';

describe('Game', () => {
    describe('Create new GameController', () => {
        it('should not allow two rooms with the same name', () => {
            const room = new Room('start', '', '');
            expect(() => new Game([room, room])).toThrowError();
        });

        it('should not allow two rooms with the same title', () => {
            const rooms = [new Room('room1', 'Room', ''), new Room('room2', 'Room', '')];
            expect(() => new Game(rooms)).toThrowError();
        });

        it('should not allow connections to rooms that does not exist', () => {
            const room1 = new Room('start', 'Room 1', '');
            const room2 = new Room('room2', 'Room 2', '');
            room1.addConnection('NORTH', 'room3');

            const rooms = [room1, room2];
            expect(() => new Game(rooms)).toThrowError(
                'Invalid connection from start to room3. Room room3 does not exist.',
            );
        });

        it('should not allow non-traversable connections to rooms', () => {
            const room1 = new Room('start', 'Room 1', '');
            const room2 = new Room('room2', 'Room 2', '');
            room1.addConnection('NORTH', room2.name);

            const rooms = [room1, room2];
            expect(() => new Game(rooms)).toThrowError('The connection from start to room2 is not reversed.');
        });

        it('should not fail when all connections are reversed', () => {
            const room1 = new Room('start', 'Room 1', '');
            const room2 = new Room('room2', 'Room 2', '');
            connectRooms(room1, room2, 'SOUTH');

            const rooms = [room1, room2];
            expect(() => new Game(rooms)).not.toThrowError();
        });

        it('should validate if a room with the name start exists', () => {
            const room1 = new Room('room1', 'Room 1', '');
            const room2 = new Room('room2', 'Room 2', '');

            const rooms = [room1, room2];
            expect(() => new Game(rooms)).toThrowError('A room with the name "start" does not exist.');
        });
    });
});
