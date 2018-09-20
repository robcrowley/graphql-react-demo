import { ActorConnector as dao } from '../data/connectors';

export class Actor {
  constructor({
    actorId,
    name
  } = {}) {
    this.actorId = actorId;
    this.name = name;
  }

  static async get(viewer, ids) {
    const data = await dao.getActors(ids);
    return data.map(item => new Actor(item));
  }

  static async getIdsByFilm(viewer, filmIds) {
    return dao.getActorIdsByFilm(filmIds);
  }

  static async findIdsByName(viewer, names) {
    return dao.findActorIdsByName(names);
  }

  static async add({
    name
  } = {}) {
    return dao.addActor(name);
  }
}

export default Actor;