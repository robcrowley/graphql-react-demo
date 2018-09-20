export const parameterize = params =>
  asArray(params)
    .map(() => "?")
    .join();

export const parameterizeLike = (column, params) =>
  asArray(params)
    .map((_, index) => `${index > 0 ? " OR" : ""} ${column} LIKE '%' || ? || '%'`
  );

export const asArray = a => (Array.isArray(a) ? a : [a]);
