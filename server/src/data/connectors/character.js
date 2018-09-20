import db from "sqlite";
import { asArray, parameterize, parameterizeLike } from "./utils";

const getCharacters = ids =>
  db.all(
    `SELECT rowid as "characterId", name FROM Character WHERE rowid IN (${parameterize(
      ids
    )})`,
    asArray(ids)
  );

const findCharacterIdsByName = names =>
  db.all(
    `SELECT rowid as "characterId" FROM Character WHERE ${parameterizeLike(
      "name",
      names
    )}`,
    asArray(names)
  );

const addCharacter = name =>
  db
    .run("INSERT INTO Character (name) VALUES ($name)", {
      $name: name
    })
    .then(({ lastID }) => lastID);

export default {
  getCharacters,
  findCharacterIdsByName,
  addCharacter
};
