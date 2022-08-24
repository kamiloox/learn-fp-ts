import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

type User = {
  firstName: string;
  lastName: string;
  accountBalance: number;
  favoriteQuote?: string;
};

it('tinkers with Option typeclass', () => {
  const user: User = {
    firstName: 'John',
    lastName: 'Doe',
    accountBalance: 3000,
  };

  expect(
    pipe(
      O.some(user),
      O.map(({ accountBalance }) => accountBalance + 300)
    )
  ).toEqual(O.some(3300));

  expect(
    pipe(
      O.some(user),
      O.map(({ firstName, lastName }) =>
        `${firstName} ${lastName}`.toUpperCase()
      )
    )
  ).toEqual(O.some('JOHN DOE'));

  expect(
    pipe(
      undefined as User | undefined,
      O.fromNullable,
      O.map(({ firstName }) => `hello ${firstName}!`),
      O.getOrElse(() => `Hello user!`),
      O.some
    )
  ).toEqual(O.some('Hello user!'));

  expect(
    pipe(
      O.some(user),
      O.chain(({ favoriteQuote }) => O.fromNullable(favoriteQuote)),
      O.map((quote) => quote.toUpperCase())
    )
  ).toEqual(O.none);

  const shout = (s: string) => `${s}!`;

  expect(
    pipe(
      O.some({ ...user, favoriteQuote: "I'll be back" }),
      O.chain(({ favoriteQuote }) => O.fromNullable(favoriteQuote)),
      O.map(shout)
    )
  ).toEqual(O.some("I'll be back!"));
});
