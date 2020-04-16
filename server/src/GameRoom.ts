import {Client, Presence, Room} from "colyseus";
import {MapSchema, Schema, type} from "@colyseus/schema"
import {createPlanets, Planet} from './model/Planet';
import {Player} from './model/Player';
import {Ship} from './model/Ship';
import {CANVAS_SIZE, distance, GAME_SPEED, obj2arr, toDataObject} from './utils';
import {Shipyard} from './shipyard';


// Our custom game state, an ArraySchema of type Player only at the moment
class GameState extends Schema {
    @type({map: Player})
    players = new MapSchema<Player>();

    @type({map: Planet})
    planets = new MapSchema<Planet>();
}

export class GameRoom extends Room<GameState> {

    private playerLoop: any;
    private planetLoop: any;

    private options: any;
    private availableShips: any[];


    constructor(presence: Presence) {
        super(presence);
        this.availableShips = Shipyard.getShips();
    }

    onCreate(options: any) {
        this.options = options;
        this.setState(new GameState());

        this.createPlanets(8);

        // Set an interval and store a reference to it
        // so that we may clear it later
        this.playerLoop = this.clock.setInterval(() => {
            Object.keys(this.state.players)
                .map(k => this.state.players[k])
                .map((p: Player) => p.ship)
                .forEach((s: Ship) => s.update());
        }, 1000 / 30);

        this.planetLoop = this.clock.setInterval(() => {
            Object.keys(this.state.planets)
                .map(k => this.state.planets[k])
                .forEach((p: Planet) => p.update());
        }, 10000 / GAME_SPEED);

        this.clock.start();
    }

    onJoin(client: Client, options: any) {
        console.log(`${client.sessionId} joined room ${this.roomId} (${this.clients.length}/${this.options.maxClients})`);
        if (this.options.maxClients < this.clients.length) {
            client.close();
        }
    }

    send(client: Client, message: any): void {
        console.log(`Sending ${JSON.stringify(message)} to ${client.sessionId}`);
        super.send(client, message);
    }

    onMessage(client: Client, message: any) {
        if (message.command) {
            console.log(`${client.id} send ${JSON.stringify(message)}`);
            switch (message.command) {
                case 'join':
                    this.onJoinAsPlayer(client, message.data);
                    break;
                case 'travel':
                    this.onTravel(client, message.data);
                    break;
                case 'data':
                    this.onData(client, message.data);
                    break;
                case 'pickup_passengers':
                    this.onPickupPassengers(client, message.data);
                    break;
                case 'buy_gas':
                    this.onBuyGas(client, message.data);
                    break;
                default:
                    this.send(client, 'what?');
            }
        }
    }

    onJoinAsPlayer(client: Client, data: any) {
        const player = new Player();
        player.name = data.name;
        Shipyard.setShip(player, data.sprite);

        const index = this.availableShips.findIndex(s => s.sprite == data.sprite);
        this.availableShips.splice(index, 1);
        this.broadcast(toDataObject('ships', this.availableShips));

        this.send(client, {type: 'whoami', data: client.sessionId});
        this.state.players[client.sessionId] = player;

        player.ship.planet$.subscribe(p => {
            player.planet = '';
            if (p) {
                p.arrive(player);
            }
        });
    }

    async onLeave(client: Client, consented: boolean) {
        // flag client as inactive for other users
        const player = this.getPlayer(client);
        if (!player) return;

        player.destroy();
        delete this.state.players[client.sessionId];
        console.log(`${client.sessionId} left room ${this.roomId}`);
    }

    onDispose() {
        this.playerLoop.clear();
        this.planetLoop.clear();
    }

    private createPlanets(num: number) {
        const planets = createPlanets().slice(0, num);
        planets.forEach(p => {
            p.pos.x = CANVAS_SIZE.width / 2;
            p.pos.y = CANVAS_SIZE.height / 2;

            const planetArr = obj2arr(this.state.planets);
            while (150 > planetArr.map(pp => distance(pp.pos, p.pos)).reduce((prev, curr) => Math.min(prev, curr), CANVAS_SIZE.width)) {
                p.pos.x = (CANVAS_SIZE.width - 100) * Math.random() + 50;
                p.pos.y = (CANVAS_SIZE.height - 100) * Math.random() + 50;
            }

            this.state.planets[p.name] = p;
        });
    }

    private getPlayer(client: Client): Player {
        return this.state.players[client.id] || null;
    }

    private getPlanet(name: string): Planet | null {
        return this.state.planets[name] || null;
    }

    private onTravel(client: Client, data: any) {
        const player = this.getPlayer(client);
        const planet = this.getPlanet(data.planet);
        player.ship.setTarget(planet);
    }

    private onData(client: Client, subject: any) {
        let data = null;
        switch (subject) {
            case 'ships':
                data = Shipyard.getShips();
                break;
        }

        this.send(client, toDataObject(subject, data));
    }

    private onPickupPassengers(client: Client, data: any) {
        const player = this.getPlayer(client);
        const planet = this.getPlanet(player.planet);
        planet.pickupPassengers(player);
    }

    private onBuyGas(client: Client, data: any) {
        const player = this.getPlayer(client);
        const planet = this.getPlanet(player.planet);
        planet.buyFuel(player);
    }
}
