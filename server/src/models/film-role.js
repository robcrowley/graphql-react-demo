import { FilmRoleConnector as dao } from '../data/connectors';
import groupBy from 'lodash/groupBy';

export class FilmRole {
  constructor({
    filmId,
    actorId,
    characterId
  } = {}) {
    this.filmId = filmId;
    this.actorId = actorId;
    this.characterId = characterId;
  }

  static async getByFilm(viewer, filmIds) {
    const roles = await dao.getFilmRolesByFilm(filmIds);
    const groups = groupBy(roles, role => role.filmId);
    return filmIds.map(filmId => groups[filmId]);
  }

  static async getByActor(viewer, actorIds) {
    const roles = await dao.getFilmRolesByActor(actorIds);
    const groups = groupBy(roles, role => role.actorId);
    return actorIds.map(actorId => groups[actorId]);
  }

  static async getByCharacter(viewer, characterIds) {
    const roles = await dao.getFilmRolesByCharacter(characterIds);
    const groups = groupBy(roles, role => role.characterId);
    return characterIds.map(characterId => groups[characterId]);
  }
}

export default FilmRole;