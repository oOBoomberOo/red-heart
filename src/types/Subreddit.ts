import { string } from "fp-ts";
import { identity } from "fp-ts/lib/function";
import * as io from "io-ts";

export const Subreddit = new io.Type<string>(
  "Subreddit",
  string.isString,
  (input: unknown, ctx) => {
    const isString = string.isString(input);
    if (isString && input.length > 0) {
      return io.success(input);
    } else if (isString) {
      return io.failure(input, ctx, `Subreddit name is empty`);
    } else {
      return io.failure(input, ctx, `Subreddit name is not a string`);
    }
  },
  identity
);

export type Subreddit = io.TypeOf<typeof Subreddit>;
