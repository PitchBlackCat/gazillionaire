import {Schema, type} from "@colyseus/schema"
import {Vector2} from './Vector2';
import {Player} from './Player';

export class Planet extends Schema {
    @type("string")
    name: string;

    @type("string")
    sprite: string;

    @type(Vector2) pos: Vector2;

    @type('number') passengers: number = 0;
    @type('number') passengerSpawMultiplier: number = 1;

    private passengerSpawnRate: number;
    private maxPassengers: number;

    private gasPrice: number;

    constructor(sprite: string, name: string) {
        super();
        this.sprite = sprite;
        this.name = name;
        this.pos = new Vector2(0, 0);

        this.maxPassengers = Math.round(Math.random() * 15);
        this.passengerSpawnRate = Math.random();
        this.gasPrice = (.5 + Math.random()) * 25;
    }

    public update() {
        let hasSpawned = false;
        for (let i = 0; i < this.passengerSpawMultiplier; i++) {
            let willSpawn = Math.random() < this.passengerSpawnRate;

            if (this.passengers > this.maxPassengers) {
                willSpawn = willSpawn && Math.random() < .5;
            }

            if (this.passengers > this.maxPassengers * 2) {
                willSpawn = willSpawn && Math.random() < .5;
            }

            if (this.passengers > this.maxPassengers * 3) {
                willSpawn = willSpawn && Math.random() < .5;
            }

            if (willSpawn) {
                this.passengers++;
                hasSpawned = true;
            }
        }

        if (!hasSpawned && this.maxPassengers < this.passengers) {
            this.passengers--;
        }
    }

    public arrive(player: Player) {
        player.planet = this.name;

        if (player.passengers_planet !== this.name) {
            player.money += 750 * player.ship.passengers;
            player.ship.passengers = 0;
        }
    }

    public buyFuel(player: Player) {
        const needed = player.ship.max_gas - player.ship.gas;
        const canBuy = player.money / this.gasPrice;
        const willBuy = Math.min(needed, canBuy);

        const totalPrice = Math.round(willBuy * this.gasPrice);
        player.money -= totalPrice;
        player.ship.gas += willBuy;
    }

    public pickupPassengers(player: Player) {
        if (player.passengers_planet !== this.name) {
            const spareSeats = player.ship.passenger_seats - player.ship.passengers;
            const take = Math.min(spareSeats, this.passengers);
            this.passengers -= take;
            player.ship.passengers += take;
            player.passengers_planet = this.name;
        }
    }
}

export const createPlanets = () => [
    new Planet('Baren', 'Ekin'),
    new Planet('Desert', 'Brith'),
    new Planet('Forest', 'Raccer'),
    new Planet('Ice', 'Joka'),
    new Planet('Lava', 'Bunce'),
    new Planet('Ocean', 'Creccorri'),
    new Planet('Terran', 'Ortu'),
    new Planet('Barren2', 'Ubas'),
    new Planet('Desert2', 'Shonci'),
    new Planet('Ice2', 'Dith'),
];










