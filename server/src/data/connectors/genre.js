import db from "sqlite";
import { asArray, parameterize } from "./utils";

const getGenres = ids =>
  db.all(
    `SELECT rowid as "genreId", name, description FROM Genre WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

const getGenreIdsByFilm = ids =>
  db
    .all(
      `SELECT g.rowid as "genreId" FROM Genre g INNER JOIN FilmGenre f ON g.rowid = f.genreId WHERE f.filmId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ genreId }) => genreId));

export default {
  getGenres,
  getGenreIdsByFilm
};
