import { CharacterConnector as dao } from '../data/connectors';

export class Character {
  constructor({
    characterId,
    name
  } = {}) {
    this.characterId = characterId;
    this.name = name;
  }

  static async get(viewer, ids) {
    const data = await dao.getCharacters(ids);
    return data.map(item => new Character(item));
  }

  static async findIdsByName(viewer, names) {
    return dao.findCharacterIdsByName(names);
  }

  static async add({
    name
  } = {}) {
    return dao.addCharacter(name);
  }
}

export default Character;