import merge from "lodash/merge";

import { typeDef as QueryType } from "./query";
import { typeDef as MutationType } from "./mutation";
import { typeDef as SubscriptionType } from "./subscription";
import { typeDef as FilmType, resolvers as FilmResolvers } from "./film";
import { typeDef as NodeType } from "./node";
import { typeDef as PageInfoType } from "./page-info";
import {
  typeDef as FilmActorsConnectionType,
  resolvers as FilmActorsConnectionResolvers
} from "./film-actors-connection";
import {
  typeDef as FilmActorsEdgeType,
  resolvers as FilmActorsEdgeResolvers
} from "./film-actors-edge";
import {
  typeDef as FilmCharactersConnectionType,
  resolvers as FilmCharactersConnectionResolvers
} from "./film-characters-connection";
import {
  typeDef as FilmCharactersEdgeType,
  resolvers as FilmCharactersEdgeResolvers
} from "./film-characters-edge";
import {
  typeDef as FilmGenresConnectionType,
  resolvers as FilmGenresConnectionResolvers
} from "./film-genres-connection";
import { typeDef as FilmGenresEdgeType } from "./film-genres-edge";
import {
  typeDef as FilmReviewsConnectionType,
  resolvers as FilmReviewsConnectionResolvers
} from "./film-reviews-connection";
import { typeDef as FilmReviewsEdgeType } from "./film-reviews-edge";
import {
  typeDef as DirectorType,
  resolvers as DirectorResolvers
} from "./director";
import {
  typeDef as DirectorFilmsConnectionType,
  resolvers as DirectorFilmsConnectionResolvers
} from "./director-films-connection";
import { typeDef as DirectorFilmsEdgeType } from "./director-films-edge";
import { typeDef as ActorType, resolvers as ActorResolvers } from "./actor";
import { typeDef as ActorFilmsConnectionType } from "./actor-films-connection";
import { typeDef as ActorsFilmsEdgeType } from "./actor-films-edge";
import {
  typeDef as CharacterType,
  resolvers as CharacterResolvers
} from "./character";
import {
  typeDef as CharacterFilmsConnectionType,
  resolvers as CharacterFilmsConnectionResolvers
} from "./character-films-connection";
import { typeDef as CharacterFilmsEdgeType } from "./character-films-edge";
import { typeDef as AggregateRatingType } from "./aggregate-rating";
import { typeDef as GenreType } from "./genre";
import {
  typeDef as SearchResultType,
  resolvers as SearchResultResolvers
} from "./search-result";
import {
  typeDef as SearchResultsConnectionType,
  resolvers as SearchResultsConnectionResolvers
} from "./search-results-connection";
import { typeDef as SearchResultsEdgeType } from "./search-results-edge";
import { typeDef as ReviewType, resolvers as ReviewResolvers } from "./review";
import { typeDef as UserType, resolvers as UserResolvers } from "./user";
import { typeDef as AddReviewInputType } from "./add-review-input";
import {
  typeDef as AddReviewPayloadType,
  resolvers as AddReviewPayloadResolvers
} from "./add-review-payload";
import { typeDef as LoginInputType } from "./login-input";
import {
  typeDef as LoginPayloadType,
  resolvers as LoginPayloadResolvers
} from "./login-payload";
import {
  typeDef as ReviewAddedEventType,
  resolvers as ReviewAddedEventResolvers
} from "./review-added-event";
import { typeDef as RatingType, resolvers as RatingResolvers } from "./rating";
import { typeDef as DateType, resolvers as DateResolvers } from "./date";
import {
  typeDef as DateTimeType,
  resolvers as DateTimeResolvers
} from "./date-time";

export const resolvers = merge(
  DateResolvers,
  DateTimeResolvers,
  RatingResolvers,
  ActorResolvers,
  FilmResolvers,
  UserResolvers,
  ReviewResolvers,
  DirectorResolvers,
  DirectorFilmsConnectionResolvers,
  LoginPayloadResolvers,
  AddReviewPayloadResolvers,
  ReviewAddedEventResolvers,
  FilmActorsConnectionResolvers,
  FilmActorsEdgeResolvers,
  FilmGenresConnectionResolvers,
  FilmReviewsConnectionResolvers,
  FilmCharactersEdgeResolvers,
  FilmCharactersConnectionResolvers,
  SearchResultResolvers,
  SearchResultsConnectionResolvers,
  CharacterResolvers,
  CharacterFilmsConnectionResolvers
);
export const typeDefs = [
  QueryType,
  MutationType,
  SubscriptionType,
  NodeType,
  PageInfoType,
  FilmType,
  FilmActorsConnectionType,
  FilmActorsEdgeType,
  FilmCharactersConnectionType,
  FilmCharactersEdgeType,
  FilmGenresConnectionType,
  FilmGenresEdgeType,
  FilmReviewsConnectionType,
  FilmReviewsEdgeType,
  DirectorType,
  DirectorFilmsConnectionType,
  DirectorFilmsEdgeType,
  ActorType,
  ActorFilmsConnectionType,
  ActorsFilmsEdgeType,
  CharacterType,
  CharacterFilmsConnectionType,
  CharacterFilmsEdgeType,
  AggregateRatingType,
  GenreType,
  SearchResultType,
  SearchResultsConnectionType,
  SearchResultsEdgeType,
  ReviewType,
  UserType,
  AddReviewInputType,
  AddReviewPayloadType,
  LoginInputType,
  LoginPayloadType,
  ReviewAddedEventType,
  RatingType,
  DateType,
  DateTimeType
];
