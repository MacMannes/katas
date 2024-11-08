export class Item {
    constructor(
        readonly name: string,
        readonly descriptions: {
            inventory: string;
            room: string;
            look: string;
        },
    ) {}
}
