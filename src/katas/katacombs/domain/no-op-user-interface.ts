import { UserInterface } from '@katas/katacombs/domain';
import { Room } from '@katas/katacombs/domain';

export class NoOpUserInterface implements UserInterface {
    displayRoom(room: Room): void {
        // NO-OP
    }
}
