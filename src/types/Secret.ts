import type { Branded } from "io-ts";

import * as io from "io-ts";

export interface SecretBrand {
  readonly Secret: unique symbol;
}

export const Secret = io.brand(
  io.string,
  (x): x is Branded<string, SecretBrand> => x.length > 0,
  "Secret"
);

export type Secret = io.TypeOf<typeof Secret>;
