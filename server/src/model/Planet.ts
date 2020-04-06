import {Schema, type} from "@colyseus/schema"
import {canvasSize} from '../utils';

export class Planet extends Schema {
    @type("string")
    name: string;

    @type("string")
    color: string;

    @type("number")
    x: number;

    @type("number")
    y: number;

    constructor(color:string, name:string, x: number, y: number) {
        super();
        this.color = color;
        this.name = name;
        this.x = x * canvasSize.width;
        this.y = y * canvasSize.height;
    }
}

export const createPlanets = () => [
    new Planet('Baren','Ekin', Math.random(), Math.random()),
    new Planet('Desert','Brith', Math.random(), Math.random()),
    new Planet('Forest','Raccer', Math.random(), Math.random()),
    new Planet('Ice','Joka', Math.random(), Math.random()),
    new Planet('Lava','Bunce', Math.random(), Math.random()),
    new Planet('Ocean','Creccorri', Math.random(), Math.random()),
    new Planet('Terran','Ortu', Math.random(), Math.random()),
    new Planet('Barren2','Ubas', Math.random(), Math.random()),
    new Planet('Desert2','Shonci', Math.random(), Math.random()),
    new Planet('Ice2','Dith', Math.random(), Math.random()),
];










