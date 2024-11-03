import { describe, expect, it } from 'vitest';
import { Game } from '@katas/katacombs/domain';

describe('Game', () => {
    const game = new Game();

    describe('start', () => {
        it('should print the title and description of the first room', () => {
            const result = game.start().toUpperCase();
            expect(result).toContain('LOST IN SHOREDITCH');
            expect(result).toContain('YOU ARE STANDING AT THE END OF A BRICK LANE');
            expect(result).toContain('DOWN A GULLY.');
        });
    });
});
