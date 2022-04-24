import * as io from "io-ts";
import { Type } from "io-ts";
import { identity } from "fp-ts/function";

export const imageTypes = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

export const ImageFile = new Type<File, File>(
  "ImageFile",
  (f): f is File => f instanceof File,
  (f, ctx) => {
    if (f instanceof File && imageTypes.includes(f.type)) {
      return io.success(f);
    } else if (f instanceof File) {
      return io.failure(f, ctx, `expected an image file but got ${f.type}`);
    } else {
      return io.failure(f, ctx, `expected a file but got ${typeof f}`);
    }
  },
  identity
);

export type ImageFile = io.TypeOf<typeof ImageFile>;
