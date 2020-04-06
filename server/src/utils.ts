export const canvasSize = { width: 800, height: 600 };
export type Point = {x: number; y: number;};
export const distance = (a: Point, b: Point) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
