import { ReviewConnector as dao } from "../data/connectors";
import { AuthenticationError } from "apollo-server-express";

export class Review {
  constructor({ reviewId, filmId, content, rating, userId, createdAt } = {}) {
    this.reviewId = reviewId;
    this.filmId = filmId;
    this.content = content;
    this.rating = rating;
    this.userId = userId;
    this.createdAt = new Date(createdAt);
  }

  static async get(viewer, ids) {
    const data = await dao.getReviews(ids);
    return data.map(item => new Review(item));
  }

  static async getIdsByFilm(viewer, ids) {
    return dao.getReviewIdsByFilm(ids);
  }

  static async getIdsByDirector(viewer, ids) {
    return dao.getReviewIdsByDirector(ids);
  }

  static async getIdsByUser(viewer, ids) {
    return dao.getReviewIdsByUser(ids);
  }

  static async add({ userId }, { filmId, content, rating } = {}) {
    if (!userId) {
      throw new AuthenticationError("An authenticated user is required");
    }
    return dao.addReview(filmId, content, rating, userId);
  }
}

export default Review;
