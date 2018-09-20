import db from "sqlite";
import { asArray, parameterize } from "./utils";

const getReviews = ids =>
  db.all(
    `SELECT rowid as "reviewId", filmId, content, rating, userId, createdAt FROM Review WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

const getReviewIdsByFilm = ids =>
  db
    .all(
      `SELECT rowid as "reviewId" FROM Review WHERE filmId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ reviewId }) => reviewId));

const getReviewIdsByDirector = ids =>
  db
    .all(
      `SELECT r.rowid as "reviewId" FROM Review r INNER JOIN Film f ON r.filmId = f.filmId WHERE f.directorId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ reviewId }) => reviewId));

const getReviewIdsByUser = ids =>
  db
    .all(
      `SELECT rowid as "reviewId" FROM Review WHERE userId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ reviewId }) => reviewId));

const addReview = (filmId, content, rating, userId) =>
  db
    .run(
      "INSERT INTO Review (filmId, content, rating, userId) VALUES ($filmId, $content, $rating, $userId)",
      {
        $filmId: filmId,
        $content: content,
        $rating: rating,
        $userId: userId
      }
    )
    .then(({ lastID }) => lastID);

export default {
  getReviews,
  getReviewIdsByFilm,
  getReviewIdsByDirector,
  getReviewIdsByUser,
  addReview
};
