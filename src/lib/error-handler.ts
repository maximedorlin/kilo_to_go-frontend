export type DataError = Record<string, string[]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDataError(obj: any): obj is DataError {
  return Object.values(obj).every(
    (value) =>
      Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}
