import { connectRooms, Room } from '@katas/katacombs/domain';

export function createDefaultRooms(): Room[] {
    const start = new Room(
        'start',
        'Lost in Shoreditch',
        'You are standing at the end of a brick lane before a small brick building called "The Old Truman Brewery".' +
            'Around you is a forest of restaurants and bars. A small stream of crafted beer flows out of the building and down a gully.',
    );
    const building = new Room(
        'building',
        'Inside the building',
        'Inside the building' +
            'Uou are inside the main room of the Truman Brewery. There is a strong smell of hops and a dozen empty casks',
    );
    connectRooms(
        {
            room: start,
            description: 'I see a brick building with a sign saying "Truman Brewery and a wooden white door".',
        },
        {
            room: building,
        },
        'NORTH',
    );

    const nowhere = new Room('nowhere', 'Nowhere', "You're on the road to Nowhere");

    return [nowhere, start, building];
}
