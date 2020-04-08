import {Schema, type} from "@colyseus/schema"
import {Vector2} from './Vector2';

export class Planet extends Schema {
    @type("string")
    name: string;

    @type("string")
    sprite: string;

    @type(Vector2) pos: Vector2;

    constructor(sprite: string, name: string, x: number, y: number) {
        super();
        this.sprite = sprite;
        this.name = name;
        this.pos = new Vector2(x, y);
    }
}

export const createPlanets = () => [
    new Planet('Baren', 'Ekin', Math.random(), Math.random()),
    new Planet('Desert', 'Brith', Math.random(), Math.random()),
    new Planet('Forest', 'Raccer', Math.random(), Math.random()),
    new Planet('Ice', 'Joka', Math.random(), Math.random()),
    new Planet('Lava', 'Bunce', Math.random(), Math.random()),
    new Planet('Ocean', 'Creccorri', Math.random(), Math.random()),
    new Planet('Terran', 'Ortu', Math.random(), Math.random()),
    new Planet('Barren2', 'Ubas', Math.random(), Math.random()),
    new Planet('Desert2', 'Shonci', Math.random(), Math.random()),
    new Planet('Ice2', 'Dith', Math.random(), Math.random()),
];










