export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];
// example: RequireAtLeastOne<{ id: string, click?: number, component?: string }, 'click' | 'component'>;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
// example: Range<1,6> means 1 | 2 | 3 | 4 | 5

export const removeFromArray = (array: any[], value: any) => {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
  return array;
};
