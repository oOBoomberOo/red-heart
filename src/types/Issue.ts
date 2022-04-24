import * as io from "io-ts";
import { Page } from "./Page";

export const Issue = io.type(
  {
    page: io.array(Page),
  },
  "Issue"
);

export type Issue = io.TypeOf<typeof Issue>;
