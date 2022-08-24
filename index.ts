import { flow } from 'fp-ts/function';

const add = (x: number) => (y: number) => x + y;

const multiply = (x: number) => (y: number) => x * y;

const inc = add(1);

const multiplyBy2 = multiply(2);

const calcSomething = flow(inc, multiplyBy2);

const result = calcSomething(4);

console.log(result);
