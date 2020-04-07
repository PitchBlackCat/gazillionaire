import {Client, Room} from "colyseus";
import {MapSchema, Schema, type} from "@colyseus/schema"
import {createPlanets, Planet} from './model/Planet';
import {Player} from './model/Player';
import {gsap} from 'gsap';
import {distance} from './utils';


// Our custom game state, an ArraySchema of type Player only at the moment
class GameState extends Schema {
    @type({map: Player})
    players = new MapSchema<Player>();

    @type({map: Planet})
    planets = new MapSchema<Planet>();
}

export class GameRoom extends Room<GameState> {

    private options: any;

    onCreate(options: any) {
        this.options = options;
        this.setState(new GameState());

        this.createPlanets(8);
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
            console.log(`${client.id} send command ${message.command}`);
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
        const p = new Player();
        p.name = data.name;
        p.ship.sprite = data.ship;
        p.planet = data.planet;

        this.send(client, {type: 'whoami', data: client.sessionId});
        this.state.players[client.sessionId] = p;
    }

    async onLeave(client: Client, consented: boolean) {
        // flag client as inactive for other users
        const player = this.getPlayer(client);
        if (!player) return;

        player.connected = false;

        try {
            // allow disconnected client to reconnect into this room until 20 seconds
            await this.allowReconnection(client, 20);

            // client returned! let's re-activate it.
            player.connected = true;

        } catch (e) {
            console.log(`${client.sessionId} left room ${this.roomId}`);
            // 20 seconds expired. let's remove the client.
            delete this.state.players[client.sessionId];
        }
    }

    onDispose() {
    }

    private createPlanets(num: number) {
        createPlanets().slice(0, num).forEach(p => {
            this.state.planets[p.name] = p;
        });
    }

    private getPlayer(client: Client) {
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
        const planet = this.getPlanet(data.planet);
        const player = this.getPlayer(client);

        const speed = 100;
        const dist = distance(player, planet);
        const circSpeed = 1.5 + Math.random();
        const offset = -10 + (Math.random() * 20);

        gsap.killTweensOf(player);

        const tl = gsap.timeline();
        tl.to(player.ship, {
            x: planet.x,
            y: planet.y,
            duration: dist / speed,
            ease: "sine.inOut"
        }).to(player.ship, {
            x: planet.x + 30,
            y: planet.y + offset,
            duration: circSpeed,
            ease: "power3.inOut"
        }).to(player.ship, {
            x: planet.x - 30,
            y: planet.y - offset,
            duration: circSpeed,
            ease: "power3.inOut",
            repeat: -1,
            yoyo: true
        })
    }
}
