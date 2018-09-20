import db from "sqlite";
import { asArray, parameterize, parameterizeLike } from "./utils";

const getDirectors = ids =>
  db.all(
    `SELECT rowid as "directorId", name FROM Director WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

  const findDirectorIdsByName = names =>
  db.all(
    `SELECT rowid as "directorId" FROM Director WHERE ${parameterizeLike(
      "name",
      names
    )}`,
    asArray(names)
  );

const addDirector = name =>
  db
    .run("INSERT INTO Director (name) VALUES ($name)", {
      $name: name
    })
    .then(({ lastID }) => lastID);

export default {
  getDirectors,
  findDirectorIdsByName,
  addDirector
};
