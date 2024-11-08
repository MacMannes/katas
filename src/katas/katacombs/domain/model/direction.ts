const directionValues = ['NORTH', 'EAST', 'SOUTH', 'WEST', 'UP', 'DOWN'] as const;

// Define `Direction` as a union of the values in `directionValues`
export type Direction = (typeof directionValues)[number];

export function isDirection(value: string): value is Direction {
    return (directionValues as readonly string[]).includes(value);
}

export function oppositeOf(direction: Direction): Direction {
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
