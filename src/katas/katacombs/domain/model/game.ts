import { Direction, Room, RoomRepository } from '@katas/katacombs/domain';

export class Game {
    private currentRoom: Room;

    constructor(private readonly roomRepository: RoomRepository) {
        this.currentRoom = roomRepository.getRoomByName('start');
    }

    public getCurrentRoom(): Room {
        return this.currentRoom;
    }

    public moveToDirection(direction: Direction): Room | undefined {
        const newRoom = this.findRoomInDirection(direction);
        if (newRoom) {
            this.currentRoom = newRoom;
        }
        return newRoom;
    }

    /**
     * Find a room in a given direction from the current toom
     * @param direction
     * @private
     */
    private findRoomInDirection(direction: Direction): Room | undefined {
        const roomName = this.getCurrentRoom().findConnection(direction)?.roomName;
        return roomName ? this.roomRepository.findRoomByName(roomName) : undefined;
    }
}
