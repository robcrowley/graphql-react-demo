-- Up
CREATE TABLE Film
(
  title NVARCHAR(128) NOT NULL,
  description NVARCHAR(1024) NOT NULL,
  directorId INTEGER NOT NULL,
  releasedOn DATE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Actor
(
  name NVARCHAR(128) NOT NULL
);

CREATE TABLE Director
(
  name NVARCHAR(128) NOT NULL
);

CREATE TABLE FilmRole
(
  filmId INTEGER NOT NULL,
  actorId INTEGER NOT NULL,
  characterId INTEGER NOT NULL,
  PRIMARY KEY (filmId, actorId, characterId)
);

CREATE TABLE Genre
(
  name NVARCHAR(128) NOT NULL,
  description NVARCHAR(1024) NOT NULL
);

CREATE TABLE FilmGenre
(
  filmId INTEGER NOT NULL,
  genreId INTEGER NOT NULL,
  PRIMARY KEY (filmId, genreId)
);

CREATE TABLE Character
(
  name NVARCHAR(128) NOT NULL
);

CREATE TABLE Review
(
  filmId INTEGER NOT NULL,
  content NVARCHAR(1024) NOT NULL,
  rating INTEGER NOT NULL,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User
(
  name NVARCHAR(128) NOT NULL,
  username NVARCHAR(32) NOT NULL,
  password NVARCHAR(128) NOT NULL,
  CONSTRAINT username_unique UNIQUE (username)
);

INSERT INTO Film
  (title, description, directorId, releasedOn)
VALUES('Gremlins', 'A boy inadvertently breaks three important rules concerning his new pet and unleashes a horde of malevolently mischievous monsters on a small town.', 1, '1984-06-08');

INSERT INTO Director
  (name)
VALUES
  ('Joe Dante');

INSERT INTO Actor
  (name)
VALUES
  ('Zach Galligan');

INSERT INTO Character
  (name)
VALUES
  ('Billy Peltzer');

INSERT INTO FilmRole
  (filmid, actorId, characterId)
VALUES(1, 1, 1);

INSERT INTO Actor
  (name)
VALUES
  ('Phoebe Cates');

INSERT INTO Character
  (name)
VALUES
  ('Kate Beringer');

INSERT INTO FilmRole
  (filmid, actorId, characterId)
VALUES(1, 2, 2);

INSERT INTO Genre
  (name, description)
VALUES('Comedy', 'Comedy is a genre of film in which the main emphasis is on humor.');

INSERT INTO FilmGenre
  (filmId, genreId)
VALUES(1, 1);

INSERT INTO Film
  (title, description, directorId, releasedOn)
VALUES('Raging Bull', 'An American biographical black-and-white sports drama film directed by Martin Scorsese.', 2, '1980-12-19');

INSERT INTO Director
  (name)
VALUES
  ('Martin Scorsese');

INSERT INTO Actor
  (name)
VALUES
  ('Robert DeNiro');

INSERT INTO Character
  (name)
VALUES
  ('Jake LaMotta');

INSERT INTO FilmRole
  (filmid, actorId, characterId)
VALUES(2, 3, 3);

INSERT INTO Genre
  (name, description)
VALUES('Drama', 'drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.');

INSERT INTO FilmGenre
  (filmId, genreId)
VALUES(2, 2);

INSERT INTO User
  (name, username, password)
VALUES
  ('ndc conf', 'ndcconf', '$2a$10$kl3PHVkkPZ.Ajg4o17s/..W8IWK5ETMykKDgBNG1KO7GSsg2ddL2e' /* 2017 */);

INSERT INTO User
  (name, username, password)
VALUES
  ('ddd perth', 'dddperth', '$2a$10$kl3PHVkkPZ.Ajg4o17s/..W8IWK5ETMykKDgBNG1KO7GSsg2ddL2e' /* 2017 */);

INSERT INTO Review
  (filmId, content, rating, userId)
VALUES
  (1, '"Gremlins" is a confrontation between Norman Rockwell''s vision of Christmas and Hollywood''s vision of the blood-sucking monkeys of voodoo island. It''s fun.', 7, 1);

INSERT INTO Review
  (filmId, content, rating, userId)
VALUES
  (2, 'Director Martin Scorsese uses gorgeous black-and-white photography to evoke the period.', 10, 1);

INSERT INTO Review
  (filmId, content, rating, userId)
VALUES
  (2, 'This is not a film about boxing. This is a film about the human condition and about cinema itself.', 8, 2);

-- Down
DROP TABLE User;
DROP TABLE Film;
DROP TABLE Actor;
DROP TABLE Genre;
DROP TABLE Review;
DROP TABLE Director;
DROP TABLE Character;
DROP TABLE FilmRole;
DROP TABLE FilmGenre;