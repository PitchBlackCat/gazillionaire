import {Schema, type, MapSchema} from "@colyseus/schema"
import {HoldItem} from './HoldItem';

export class Ship extends Schema {
    @type("string") sprite: string = 'Blue-1';

    @type("number") passenger_room_size: number = 0;
    @type("number") passengers: number = 0;

    @type("number") hold_size: number = 0;
    @type({map: HoldItem}) hold_items = new MapSchema<HoldItem>();

    @type("number") x: number = 0;
    @type("number") y: number = 0;

    @type("number") acceleration: number = .5;
    @type("number") max_speed: number = 10;
    @type("number") speed: number = 0;
    @type("number") gas: number = 100;

    constructor() {
        super();
    }
}
