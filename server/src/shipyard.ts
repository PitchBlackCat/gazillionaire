import {Player} from './model/Player';
import {GAME_SPEED} from './utils';

export class Shipyard {
    static getShips() {
        const year = new Date().getFullYear();
        return [
            {
                name: 'Eagle-6',
                description: 'This well rounded ship will get any job done!',
                price: 50000,
                sprite: 'Red-2',
                passenger_seats: 5,
                hold_size: 100,

                acceleration: .1,
                max_speed: 1,

                max_gas: 1000,
                efficiency: .25
            },

            {
                name: 'The Planet Express',
                description: 'Will get you and yours all across the galaxy in no time at all!',
                price: 70000,
                sprite: 'Yellow-4',
                passenger_seats: 10,
                hold_size: 50,

                acceleration: .11,
                max_speed: 1.1,

                max_gas: 1500,
                efficiency: .3
            },

            {
                name: 'The Enormous',
                description: `It's slow, but it's just so... gigantic!`,
                price: 75000,
                sprite: 'SilverBlue-5',
                passenger_seats: 15,
                hold_size: 200,

                acceleration: .08,
                max_speed: .9,

                max_gas: 2500,
                efficiency: .35
            },

            {
                name: 'Bright Aster',
                description: `Has a couple extra seats, but the engine looks a bit crummy.`,
                price: 60000,
                sprite: 'Purple-4',
                passenger_seats: 7,
                hold_size: 100,

                acceleration: .09,
                max_speed: .9,

                max_gas: 1500,
                efficiency: .3
            },

            {
                name: `${year} Falcon`,
                description: `Rumoured to be the fastest cargo hauler in the universe!`,
                price: 70000,
                sprite: 'Blue-5',
                passenger_seats: 2,
                hold_size: 150,

                acceleration: .12,
                max_speed: 1.2,

                max_gas: 1000,
                efficiency: .3
            },

            {
                name: `Mo' Strono`,
                description: `This mining ship has ample cargo space!`,
                price: 60000,
                sprite: 'DarkGrey-5',
                passenger_seats: 5,
                hold_size: 200,

                acceleration: .09,
                max_speed: .9,

                max_gas: 1500,
                efficiency: .3
            },
        ];
    }

    static setShip(player: Player, sprite: string) {
        const ship: any = this.getShips().find(s => s.sprite === sprite);

        player.mortgage = ship.price;
        player.money = 100000 - ship.price;

        player.ship.sprite = ship.sprite;

        player.ship.passenger_seats = ship.passenger_seats;
        player.ship.hold_size = ship.hold_size;
        player.ship.acceleration = ship.acceleration;
        player.ship.max_speed = ship.max_speed * GAME_SPEED;
        player.ship.max_gas = ship.max_gas;
        player.ship.efficiency = ship.efficiency;
    }
}
