import {Client, Delayed, Room} from "colyseus";
import {MapSchema, Schema, type} from "@colyseus/schema"
import {createPlanets, Planet} from './model/Planet';
import {Player} from './model/Player';
import {Ship} from './model/Ship';
import {canvasSize} from './utils';


// Our custom game state, an ArraySchema of type Player only at the moment
class GameState extends Schema {
    @type({map: Player})
    players = new MapSchema<Player>();

    @type({map: Planet})
    planets = new MapSchema<Planet>();
}

export class GameRoom extends Room<GameState> {

    private delayedInterval: any;
    private options: any;

    onCreate(options: any) {
        this.options = options;
        this.setState(new GameState());

        this.createPlanets(8);

        // Set an interval and store a reference to it
        // so that we may clear it later
        this.delayedInterval = this.clock.setInterval(() => {
            Object.keys(this.state.players)
                .map(k => this.state.players[k])
                .map((p: Player) => p.ship)
                .forEach((s: Ship) => s.update());
        }, 1000 / 30);

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
                default:
                    this.send(client, 'what?');
            }
        }
    }

    onJoinAsPlayer(client: Client, data: any) {
        const player = new Player();
        player.name = data.name;
        player.ship.sprite = data.ship;

        this.send(client, {type: 'whoami', data: client.sessionId});
        this.state.players[client.sessionId] = player;

        player.ship.planet$.subscribe(p => {
            if (p) {
                player.planet = p.name;
                player.screen = 'at_planet';
            } else {
                player.planet = '';
                player.screen = '';
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
        this.delayedInterval.clear();
    }

    private createPlanets(num: number) {
        createPlanets().slice(0, num).forEach(p => {
            this.state.planets[p.name] = p;
            p.pos.x = (canvasSize.width - 100) * Math.random() + 50;
            p.pos.y = (canvasSize.height - 100) * Math.random() + 50;
        });
    }

    private getPlayer(client: Client): Player {
        return this.state.players[client.id] || null;
    }

    private getPlayerByName(name: string) {
        return Object.keys(this.state.players)
            .map(k => this.state.players[k])
            .filter(p => p.name === name) || null;
    }

    private getPlanet(name: string) {
        return this.state.planets[name] || null;
    }

    private onTravel(client: Client, data: any) {
        const player = this.getPlayer(client);
        const planet = this.getPlanet(data.planet);
        player.ship.setTarget(planet);
    }
}
