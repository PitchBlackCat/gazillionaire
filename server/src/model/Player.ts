import {Schema, type} from "@colyseus/schema"
import {Ship} from './Ship';

export type PlayerStateString =
    'pick_ship' |
    'traveling' |
    'at_planet' ;

export class Player extends Schema {
    @type("string") name: string = '';
    @type("string") screen: PlayerStateString = 'pick_ship';

    @type("string") planet: string;
    @type(Ship) ship: Ship;

    @type("boolean") connected: boolean = true;

    constructor() {
        super();
        this.x = Math.random() * 640;
        this.y = Math.random() * 480;
    }
}
