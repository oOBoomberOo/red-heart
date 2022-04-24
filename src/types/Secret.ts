import { string } from "fp-ts";
import { identity } from "fp-ts/lib/function";
import * as io from "io-ts";
import { withMessage } from "io-ts-types";

export const Secret = new io.Type<string>(
  "Secret",
  string.isString,
  (input: unknown, ctx) => {
    const isString = string.isString(input);
    if (isString && input.length > 0) {
      return io.success(input);
    } else if (isString) {
      return io.failure(input, ctx, `Secret is empty`);
    } else {
      return io.failure(input, ctx, `Secret is not a string`);
    }
  },
  identity
);

export type Secret = io.TypeOf<typeof Secret>;

export const RedditSecret = withMessage(Secret, () => `Reddit's key is empty`);
export const TwitterSecret = withMessage(
  Secret,
  () => `Twitter's key is empty`
);
