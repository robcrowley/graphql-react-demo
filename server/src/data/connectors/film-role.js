import db from "sqlite";
import { asArray, parameterize } from "./utils";

const getFilmRolesByFilm = ids =>
  db
    .all(
      `SELECT filmId, actorId, characterId FROM FilmRole WHERE filmId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    );

const getFilmRolesByActor = ids =>
    db
      .all(
        `SELECT filmId, actorId, characterId FROM FilmRole WHERE actorId IN (${parameterize(
          ids
        )})`,
        asArray(ids)
      );

const getFilmRolesByCharacter = ids =>
  db
    .all(
      `SELECT filmId, actorId, characterId FROM FilmRole WHERE characterId IN (${parameterize(
        ids
      )})`,
      asArray(ids)
    );


export default {
  getFilmRolesByFilm,
  getFilmRolesByActor,
  getFilmRolesByCharacter
};
