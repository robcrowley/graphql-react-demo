import db from "sqlite";

const getUser = id => db
    .get(`SELECT rowid as "userId", name, username, password FROM User WHERE userId = ?`, id);

const getUserByUsername = username => db
    .get(`SELECT rowid as "userId", name, username, password FROM User WHERE username = ?`, username);

export default {
  getUser,
  getUserByUsername
};
