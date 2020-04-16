export const CANVAS_SIZE = {width: 800, height: 600};
export const GAME_SPEED = 10;

export type Point = { x: number; y: number; };

export function distance(a: Point, b: Point) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function toDataObject(subject: string, data: any) {
    return {type: 'data', subject, data};
}

export function obj2arr(obj: {[key: string]: any}): any[] {
    return Object.keys(obj).map(n => obj[n]);
}
