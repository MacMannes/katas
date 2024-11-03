import { describe, expect, it } from 'vitest';
import { Game } from '@katas/katacombs/domain';

describe('Game', () => {
    const game = new Game();

    describe('start', () => {
        it('should print the title of the first room', () => {
            const result = game.start();
            expect(result).toContain('LOST IN SHOREDITCH');
        });
    });
});
