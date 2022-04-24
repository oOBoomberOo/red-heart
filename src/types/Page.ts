import * as io from "io-ts";
import { Source } from "./Source";

export const Page = io.array(Source, "Page");
export type Page = io.TypeOf<typeof Page>;
