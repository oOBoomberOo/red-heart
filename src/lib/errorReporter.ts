import { either, option } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import { Errors, Type, ValidationError } from "io-ts";
import { formatValidationError } from "io-ts-reporters";

export function report(errors: Errors): string {
  const head = <T>(f: T[]) => pipe(f.at(0), option.fromNullable);

  const errorMessage = (err: ValidationError) =>
    pipe(
      option.fromNullable(err.message),
      option.alt(() => formatValidationError(err))
    );

  return pipe(
    errors,
    head,
    option.chain(errorMessage),
    option.getOrElse(() => `Validation failed`)
  );
}

export function decode<T, O>(
  type: Type<T, O, unknown>
): (input: unknown) => either.Either<string, T> {
  return flow(type.decode, either.mapLeft(report));
}
