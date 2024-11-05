/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserInterface } from '@katas/katacombs/domain';
import { Room } from '@katas/katacombs/domain';

export class NoOpUserInterface implements UserInterface {
    displayMessage(message: string): void {
        // NO-OP
    }

    displayRoom(room: Room): void {
        // NO-OP
    }
}
