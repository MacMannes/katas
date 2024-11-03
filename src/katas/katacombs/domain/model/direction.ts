export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST' | 'UP' | 'DOWN';

export function oppositeDirectionOf(direction: Direction): Direction {
    const opposites: Record<Direction, Direction> = {
        NORTH: 'SOUTH',
        EAST: 'WEST',
        SOUTH: 'NORTH',
        WEST: 'EAST',
        UP: 'DOWN',
        DOWN: 'UP',
    };

    return opposites[direction];
}
