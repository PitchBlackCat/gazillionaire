import {MapSchema, Schema, type} from "@colyseus/schema"
import {HoldItem} from './HoldItem';
import {Vector2} from './Vector2';
import {BehaviorSubject, Observable} from 'rxjs';
import {Planet} from './Planet';
import {distinctUntilChanged} from 'rxjs/internal/operators';

export class Ship extends Schema {
    @type("string") sprite: string = 'Blue-1';

    @type("number") passenger_room_size: number = 0;
    @type("number") passengers: number = 0;

    @type("number") hold_size: number = 0;
    @type({map: HoldItem}) hold_items = new MapSchema<HoldItem>();

    @type(Vector2) pos: Vector2 = new Vector2(0, 0);
    @type(Vector2) target: Vector2 = new Vector2(0, 0);

    @type("number") acceleration: number = .2; //.1
    @type("number") max_speed: number = 10; //1
    @type("number") speed: number = 0;
    @type("number") gas: number = 1000;
    @type("number") max_gas: number = 1000;
    @type("number") efficiency: number = .25;
    @type("boolean") burning: boolean = false;

    private _planet$: BehaviorSubject<Planet | null> = new BehaviorSubject<Planet | null>(null);
    public planet$: Observable<Planet | null> = this._planet$.pipe(
        distinctUntilChanged()
    );
    private _targetPlanet: Planet | null = null;
    private drag: number = .1; //.01
    private angle: number = 0;

    constructor() {
        super();
    }

    private get distanceToTarget(): number {
        return Math.sqrt((this.pos.x - this.target.x) ** 2 + (this.pos.y - this.target.y) ** 2)
    }

    destroy() {
        this._planet$.complete();
    }

    setTarget(target: Planet) {
        this._planet$.next(null);

        if (target === null) {
            this._targetPlanet = null;
            this.burning = false;
        } else {
            this.target.set(target.pos);
            this._targetPlanet = target;
            this.burning = true;
        }
    }

    update() {
        this.move();
    }

    private moveTowardsAngle() {
        this.pos.x += this.speed * Math.cos(this.angle);
        this.pos.y += this.speed * Math.sin(this.angle);
    }

    private aimAtTarget() {
        let dx = this.target.x - this.pos.x;
        let dy = this.target.y - this.pos.y;
        this.angle = Math.atan2(dy, dx);
    }

    private move() {
        if (this.burning) {
            this.aimAtTarget();

            if (this.gas > 0) {
                this.speed = Math.min(this.max_speed, this.speed + this.acceleration);
            }
        }

        let distanceTraveled = 0;
        if (this.speed > 0) {
            if (this._targetPlanet && this.distanceToTarget <= this.speed) {
                distanceTraveled = this.distanceToTarget;
                this.pos.x = this.target.x;
                this.pos.y = this.target.y;
                this.speed = 0;

                if (this._targetPlanet) {
                    this._planet$.next(this._targetPlanet);
                }
            } else {
                this.moveTowardsAngle();
                distanceTraveled = this.speed;
            }

            if (this.burning) {
                this.gas = Math.max(0, this.gas - distanceTraveled * this.efficiency);
            }

            this.speed = Math.max(0, this.speed - this.drag);
        }
    }
}
