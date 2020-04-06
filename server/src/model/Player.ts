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
    @type(Ship) ship: Ship = new Ship();

    @type("boolean") connected: boolean = true;

    constructor() {
        super();
    }
}
