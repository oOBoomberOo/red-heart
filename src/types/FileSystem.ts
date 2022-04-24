import * as io from "io-ts";
import { Type } from "io-ts";
import { identity } from "fp-ts/function";

export const FileSystem = new Type<FileSystemFileHandle, FileSystemFileHandle>(
  "FileSystem",
  (f): f is FileSystemFileHandle => f instanceof FileSystemFileHandle,
  (f, ctx) => {
    if (f instanceof FileSystemFileHandle) {
      return io.success(f);
    } else {
      return io.failure(f, ctx, `expected a file system handle`);
    }
  },
  identity
);

export type FileSystem = io.TypeOf<typeof FileSystem>;
