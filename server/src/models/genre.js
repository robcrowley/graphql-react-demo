import { GenreConnector as dao } from '../data/connectors';

export class Genre {
  constructor({
    genreId,
    name,
    description
  } = {}) {
    this.genreId = genreId;
    this.name = name;
    this.description = description;
  }

  static async get(viewer, ids) {
    const data = await dao.getGenres(ids);
    return data.map(item => new Genre(item));
  }

  static async getIdsByFilm(viewer, filmIds) {
    return dao.getGenreIdsByFilm(filmIds);
  }
}

export default Genre;