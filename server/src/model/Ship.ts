import {MapSchema, Schema, type} from "@colyseus/schema"
import {HoldItem} from './HoldItem';
import {Vector2} from './Vector2';
import {BehaviorSubject, Observable} from 'rxjs';
import {Planet} from './Planet';
import {distinctUntilChanged, takeUntil} from 'rxjs/internal/operators';

export class Ship extends Schema {
    @type("string") sprite: string = 'Blue-1';

    @type("number") passenger_room_size: number = 0;
    @type("number") passengers: number = 0;

    @type("number") hold_size: number = 0;
    @type({map: HoldItem}) hold_items = new MapSchema<HoldItem>();

    @type(Vector2) pos: Vector2 = new Vector2(0, 0);
    @type(Vector2) target: Vector2 = new Vector2(0, 0);
    @type("number") y: number = 0;

    @type("number") acceleration: number = .5;
    @type("number") max_speed: number = 10;
    @type("number") speed: number = 0;
    @type("number") gas: number = 1000;
    @type("number") max_gas: number = 1000;
    @type("number") efficiency: number = .25;

    private _planet$: BehaviorSubject<Planet | null> = new BehaviorSubject<Planet | null>(null);
    private _targetPlanet: Planet | null = null;
    private drag: number = .1;

    public planet$: Observable<Planet | null> = this._planet$.pipe(
        distinctUntilChanged()
    );

    constructor() {
        super();
    }

    destroy() {
        this._planet$.complete();
    }

    private get distanceToTarget(): number {
        return Math.sqrt((this.pos.x - this.target.x) ** 2 + (this.pos.y - this.target.y) ** 2);
    }

    moveTowardsTarget() {
        let dx = this.target.x - this.pos.x;
        let dy = this.target.y - this.pos.y;
        let angle = Math.atan2(dy, dx);

        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
    }

    setTarget(target: Planet) {
        this._planet$.next(null);

        if (target === null) {
            this.target.set(this.pos);
            this._targetPlanet = null;
        } else {
            this.target.set(target.pos);
            this._targetPlanet = target;
        }
    }

    update() {
        this.move();
    }

    private move() {
        if (this.gas > 0 && !this.pos.equals(this.target)) {
            this.speed = Math.min(this.max_speed, this.speed + this.acceleration);
        }

        if (this.speed > 0) {
            if (this.distanceToTarget <= this.speed) {
                this.gas = Math.max(0, this.gas - this.distanceToTarget * this.efficiency);
                this.pos.x = this.target.x;
                this.pos.y = this.target.y;
                this.speed = 0;

                if (this._targetPlanet) {
                    this._planet$.next(this._targetPlanet);
                }

            } else {
                this.moveTowardsTarget();
                this.gas = Math.max(0, this.gas - this.speed * this.efficiency);
                this.speed = Math.max(0, this.speed - this.drag);
            }
        }
    }
}
