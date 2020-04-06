import http from "http";
import express from "express";
import cors from "cors";
import {Server} from "colyseus";
import {monitor} from "@colyseus/monitor";
import {GameRoom} from "./GameRoom";
import {Lobby} from './Lobby';

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
    server,
});

// register your room handlers
gameServer.define('lobby', Lobby);
gameServer.define('game', GameRoom, {maxClients: 5});

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`) 
