import {Client, Room} from "colyseus";


export class Lobby extends Room {

    onCreate(options: any) {
    }

    onJoin(client: Client, options: any) {

    }

    onMessage(client: Client, message: any) {
        if(message.command) {
            switch(message.command) {
                case 'new_game':
                    this.send(client, 'what?');
                    break;
                default:
                    this.send(client, 'what?');
            }
        }
    }

    onLeave(client: Client, consented: boolean) {
    }

    onDispose() {
    }

}
