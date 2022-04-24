import * as io from "io-ts";

export const Source = io.type(
  {
    label: io.string,
    sources: io.union([io.string, io.array(io.string)]),
  },
  "Source"
);

export type Source = io.TypeOf<typeof Source>;
