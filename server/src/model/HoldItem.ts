import {Schema, type} from "@colyseus/schema"

export class HoldItem extends Schema {
    @type("string") name: string;

    @type("number") amount: number;
    @type("number") average_price: number;

    constructor() {
        super();
    }
}
