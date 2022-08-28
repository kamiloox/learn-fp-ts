import { Eq, struct, contramap } from 'fp-ts/eq';
import { getEq } from 'fp-ts/Array';

type Point = {
  readonly x: number;
  readonly y: number;
};

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
};

/**
 * Use eqPointStruct instead
 * @deprecated
 */
const eqPoint: Eq<Point> = {
  equals: ({ x: x1, y: y1 }, { x: x2, y: y2 }) => x1 === x2 && y1 === y2,
};

// compare specified fields
const eqPointStruct: Eq<Point> = struct({
  x: eqNumber,
  y: eqNumber,
});

const elem =
  <A>(E: Eq<A>) =>
  (as: ReadonlyArray<A>) =>
  (a: A) =>
    as.some((item) => E.equals(a, item));

export const hasPoint = elem(eqPointStruct);

export type Vector2D = {
  from: Point;
  to: Point;
};

export const eqVector: Eq<Vector2D> = struct({
  from: eqPointStruct,
  to: eqPointStruct,
});

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPointStruct);

type User = {
  readonly name: string;
  readonly age: number;
};

export const eqUser: Eq<User> = contramap(({ age }: User) => age)(eqNumber);

export const userEquals = (a: User) => (b: User) => eqUser.equals(a, b);
