import {Schema, type} from "@colyseus/schema"
import {HoldItem} from './HoldItem';
import {Planet} from './Planet';

class MapSchema {
}

export class Ship extends Schema {
    @type("string") name: string = '';

    @type("number") passenger_room_size: number;
    @type("number") passengers: number;

    @type("number") hold_size: number;
    @type({map: HoldItem}) hold_items = new MapSchema<HoldItem>();

    @type("number") x: number;
    @type("number") y: number;

    @type("number") acceleration: number = 10;
    @type("number") speed: number  = 0;
    @type("number") gas: number = 100;

    constructor() {
        super();
        this.x = Math.random() * 640;
        this.y = Math.random() * 480;
    }
}
