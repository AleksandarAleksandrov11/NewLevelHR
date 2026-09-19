/**
 * Widens literal types produced by `as const` so that translated dictionaries
 * can be typed against the English reference while keeping the exact object
 * shape (and tuple lengths) mandatory.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly unknown[]
        ? { [K in keyof T]: Widen<T[K]> }
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;
