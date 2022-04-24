import type { Branded } from "io-ts";

import * as io from "io-ts";

export interface SubredditBrand {
  readonly Subreddit: unique symbol;
}

export const Subreddit = io.brand(
  io.string,
  (x): x is Branded<string, SubredditBrand> => x.length > 0,
  "Subreddit"
);

export type Subreddit = io.TypeOf<typeof Subreddit>;
