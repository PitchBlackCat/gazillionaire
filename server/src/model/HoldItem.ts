import {Schema, type} from "@colyseus/schema"

export class HoldItem extends Schema {
    @type("string") name: string = '';

    @type("number") amount: number = 0;
    @type("number") average_price: number = 0;

    constructor() {
        super();
    }
}
