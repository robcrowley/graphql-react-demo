import db from "sqlite";

import { asArray, parameterize } from "./utils";

const getAggregatedRatings = ids =>
  db.all(
    `SELECT
       filmId,
       count(rating) as "count",
       avg(rating) as "average",
       max(rating) as "best",
       min(rating) as "worst"
       FROM Review WHERE filmId IN (${parameterize(ids)})
       GROUP BY filmId`,
    asArray(ids)
  );

export default {
  getAggregatedRatings
};
