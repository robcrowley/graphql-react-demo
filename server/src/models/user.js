import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server-express";
import { UserConnector as dao } from "../data/connectors";

export class User {
  constructor({ userId, name, username } = {}) {
    this.userId = userId;
    this.name = name;
    this.username = username;
  }

  static isAccessibleTo(viewer, { username } = {}) {
    return viewer.username === username;
  }

  static async login(username, password) {
    const data = await dao.getUserByUsername(username);

    if (!!data && (await bcrypt.compare(password, data.password))) {
      return new User(data);
    }

    throw new UserInputError("Invalid username or password");
  }

  static async get(viewer, id) {
    const data = await dao.getUser(id);

    return User.isAccessibleTo(viewer, data) ? new User(data) : null;
  }

  static async getByUsername(viewer, username) {
    const data = await dao.getUserByUsername(username);

    return User.isAccessibleTo(viewer, data) ? new User(data) : null;
  }
}

export default User;
