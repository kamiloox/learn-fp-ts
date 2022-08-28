import { hasPoint, Vector2D, userEquals } from './eq';

it('tests equality', () => {
  expect(
    hasPoint([
      { x: 4, y: 5 },
      { x: 3, y: 4 },
    ])({ x: 3, y: 5 })
  ).toBeFalsy();

  expect(
    hasPoint([
      { x: 4, y: 5 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
    ])({ x: 3, y: 5 })
  ).toBeTruthy();

  const v1: Vector2D = { from: { x: 1, y: 2 }, to: { x: 4, y: 4 } };
  const v2: Vector2D = { from: { x: 1, y: 2 }, to: { x: 4, y: 5 } };

  expect(v1).not.toEqual(v2);

  expect(v1).toEqual({ ...v2, to: { ...v2.to, y: 4 } });

  expect(
    userEquals({ age: 20, name: 'John' })({ age: 20, name: 'Mark' })
  ).toBeTruthy();

  expect(
    userEquals({ age: 20, name: 'John' })({ age: 19, name: 'Mark' })
  ).toBeFalsy();
});
