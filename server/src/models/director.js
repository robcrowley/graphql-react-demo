import { DirectorConnector as dao } from '../data/connectors';

export class Director {
  constructor({
    directorId,
    name
  } = {}) {
    this.directorId = directorId;
    this.name = name;
  }

  static async get(viewer, ids) {
    const data = await dao.getDirectors(ids);
    return data.map(item => new Director(item));
  }

  static async findIdsByName(viewer, names) {
    return dao.findDirectorIdsByName(names);
  }

  static async add({
    name
  } = {}) {
    return dao.addDirector(name);
  }
}

export default Director;