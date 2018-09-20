import { FilmConnector as dao } from '../data/connectors';

export class Film {
  constructor({
    filmId,
    title,
    description,
    directorId,
    releasedOn,
    createdAt
  } = {}) {
    this.filmId = filmId;
    this.title = title;
    this.description = description;
    this.directorId = directorId;
    this.releasedOn = releasedOn;
    this.createdAt = createdAt;
  }

  static async get(viewer, ids) {
    const data = await dao.getFilms(ids);
    return data.map(item => new Film(item));
  }

  static async findIdsByTitle(viewer, titles) {
    return dao.findFilmIdsByTitle(titles);
  }

  static async getIdsByDirector(viewer, directorIds) {
    return dao.getFilmIdsByDirector(directorIds);
  }

  static async getIdsByActor(viewer, actorIds) {
    return dao.getFilmIdsByActor(actorIds);
  }

  static async getIdsByCharacter(viewer, characterIds) {
    return dao.getFilmIdsByCharacter(characterIds);
  }

  static async add({
    title,
    description,
    directorId
  } = {}) {
    return dao.addFilm(title, description, directorId);
  }
}

export default Film;