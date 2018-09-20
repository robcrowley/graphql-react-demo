import { AggregateRatingConnector as dao } from "../data/connectors";

export class AggregateRating {
  constructor({ filmId, count, average, best, worst } = {}) {
    this.filmId = filmId
    this.count = count
    this.average = average
    this.best =  best
    this.worst =  worst
  }

  static async get(viewer, ids) {
    return dao.getAggregatedRatings(ids);
  }
}

export default AggregateRating;