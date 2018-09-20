import jwt from "jsonwebtoken";
import config from "../config";
import * as authorization from "auth-header";

export class Viewer {
  constructor({ userId, username, name } = {}) {
    this.userId = userId;
    this.name = name;
    this.username = username;
  }

  static fromJwt(token) {
    var data = jwt.verify(token, config.token.secret);

    return new Viewer(data);
  }

  static fromBearerAuthHeader(header) {
    try {
      const { scheme, token } = authorization.parse(header);
      if (scheme === "Bearer") {
        return Viewer.fromJwt(token);
      }
    } catch (error) {
      /* gulp */
    }
    return new Viewer();
  }

  toJwt() {
    return jwt.sign(
      {
        userId: this.userId,
        name: this.name,
        username: this.username
      },
      config.token.secret,
      { expiresIn: config.token.expiry }
    );
  }
}

export default Viewer;
