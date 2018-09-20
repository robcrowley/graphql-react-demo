import db from "sqlite";
import { asArray, parameterize, parameterizeLike } from "./utils";

const getActors = ids =>
  db.all(
    `SELECT rowid as "actorId", name FROM Actor WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

const getActorIdsByFilm = ids =>
  db
    .all(
      `SELECT a.rowid as "actorId" FROM Actor a INNER JOIN FilmRole c ON a.rowid = c.actorId WHERE c.filmId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    )
    .then(rows => rows.map(({ actorId }) => actorId));

const findActorIdsByName = names =>
  db.all(
    `SELECT rowid as "actorId" FROM Actor WHERE ${parameterizeLike(
      "name",
      names
    )}`,
    asArray(names)
  );

const addActor = name =>
  db
    .run("INSERT INTO Actor (name) VALUES ($name)", {
      $name: name
    })
    .then(({ lastID }) => lastID);

export default {
  getActors,
  getActorIdsByFilm,
  findActorIdsByName,
  addActor
};
