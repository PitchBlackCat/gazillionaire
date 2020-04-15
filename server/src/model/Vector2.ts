import {Schema, type} from "@colyseus/schema"
import {CANVAS_SIZE} from '../utils';

export class Vector2 extends Schema {
    @type("number")
    x: number;

    @type("number")
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    set(other: Vector2) {
        this.x = other.x;
        this.y = other.y;
    }
}
