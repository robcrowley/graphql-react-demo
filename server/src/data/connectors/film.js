import db from "sqlite";
import { asArray, parameterize, parameterizeLike } from "./utils";

const getFilms = ids =>
  db.all(
    `SELECT rowid as "filmId", title, description, directorId, releasedOn, createdAt FROM Film WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

const getFilmIdsByDirector = ids =>
  db
    .all(
      `SELECT rowid as "filmId" FROM Film WHERE directorId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ filmId }) => filmId));

const getFilmIdsByCharacter = ids =>
  db
    .all(
      `SELECT f.rowid as "filmId" FROM Film f INNER JOIN FilmRole c ON f.rowid = c.filmId WHERE c.characterId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ filmId }) => filmId));

const getFilmIdsByActor = ids =>
  db
    .all(
      `SELECT f.rowid as "filmId" FROM Film f INNER JOIN FilmRole c ON f.rowid = c.filmId WHERE c.actorId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ filmId }) => filmId));

const findFilmIdsByTitle = titles =>
  db.all(
    `SELECT rowid as "filmId" FROM Film WHERE ${parameterizeLike(
      "title",
      titles
    )}`,
    asArray(titles)
  );

const addFilm = (title, description, directorId) =>
  db
    .run(
      "INSERT INTO Film (title, directorId) VALUES ($title, $description, $directorId)",
      {
        $title: title,
        $description: description,
        $directorId: directorId
      }
    )
    .then(({ lastID }) => lastID);

export default {
  getFilms,
  getFilmIdsByActor,
  getFilmIdsByDirector,
  getFilmIdsByCharacter,
  findFilmIdsByTitle,
  addFilm
};
