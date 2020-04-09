import {Schema, type} from "@colyseus/schema"
import {Ship} from './Ship';

export type Screen =
    '' |
    'pick_ship' |
    'traveling' |
    'at_planet' ;

export class Player extends Schema {
    @type("string") name: string = '';
    @type("string") screen: Screen = '';
    @type("string") planet: string = '';

    @type("number") debt: number = 0;
    @type("number") money: number = 0;

    @type(Ship) ship: Ship = new Ship();
    @type("boolean") connected: boolean = true;

    constructor() {
        super();
    }

    destroy() {
        this.ship.destroy();
    }
}
