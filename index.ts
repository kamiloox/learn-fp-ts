import { flow } from 'fp-ts/function';

const add = (x: number) => (y: number) => x + y;

const multiply = (x: number) => (y: number) => x * y;

const inc = add(1);

const multiplyBy2 = multiply(2);

const calcSomething = flow(inc, multiplyBy2);

const result = calcSomething(4);

console.log(result);

interface URIToKind<A> {
  Array: ReadonlyArray<A>;
}

type URIS = keyof URIToKind<unknown>;

type Kind<F extends URIS, A> = URIToKind<A>[F];

interface Mappable<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>;
}

const mappableArray: Mappable<'Array'> = {
  map: (f) => (as) => as.map(f),
};
