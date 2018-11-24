import { extractId } from "../node";
import { gql } from "apollo-server-express";
import { toGlobalId, connectionFromPromisedArray } from "graphql-relay";

export const typeDef = gql`
  extend type Query {
    film(id: ID, filmId: Int): Film
  }

  type Film implements Node {
    id: ID!
    filmId: ID!
    title: String
    description: String
    director: Director
    releasedOn: Date
    createdAt: String
    cast(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmActorsConnection
    genres(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmGenresConnection
    characters(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmCharactersConnection
    reviews(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmReviewsConnection
  }
`;

export const resolvers = {
  Query: {
    film: (_, args, { loaders }) =>
      loaders.film.load(extractId(args, args => args.filmId))
  },
  Film: {
    id: ({ filmId }, _, { models }) => toGlobalId(filmId, models.film.name),
    director: ({ filmId }, _, { loaders }) => loaders.director.load(filmId),
    cast: ({ filmId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByFilm.load(filmId).then(ids =>
          ids.map(({ actorId, characterId }) => ({
            castAs: loaders.character.load(characterId),
            actor: loaders.actor.load(actorId)
          }))
        ),
        args
      ),
    characters: ({ filmId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByFilm.load(filmId).then(ids =>
          ids.map(({ characterId, actorId }) => ({
            playedBy: loaders.actor.load(actorId),
            character: loaders.character.load(characterId)
          }))
        ),
        args
      ),
    genres: ({ filmId }, args, { viewer, loaders, models }) =>
      connectionFromPromisedArray(
        models.genre
          .getIdsByFilm(viewer, filmId)
          .then(ids => ids.map(id => loaders.genre.load(id))),
        args
      ),
    reviews: async ({ filmId }, args, { viewer, loaders, models }) => {
      const connection = await connectionFromPromisedArray(
        models.review
          .getIdsByFilm(viewer, filmId)
          .then(ids => ids.map(id => loaders.review.load(id))),
        args
      );
      return {
        ...connection,
        aggregateRating: loaders.aggregateRating.load(filmId)
      };
    }
  }
};
