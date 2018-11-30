import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const FILM_REVIEWS_SUBSCRIPTION = gql`
  subscription onReviewAdded($id: ID, $filmId: Int) {
    reviewAdded(id: $id, filmId: $filmId) {
      review {
        __typename
        id
        reviewId
        content
        rating
        createdAt
      }
      film {
        __typename
        id
        filmId
        title
        description
        releasedOn
      }
    }
  }
`;

const FilmReviewSubscriber = ({ filmId }) => (
  <Subscription subscription={FILM_REVIEWS_SUBSCRIPTION} variables={{ filmId }}>
    {({ data, loading }) => (
      <section>
        {!loading && (
          <div className="alert alert-primary" role="alert">
            <strong>New Review:</strong> {data.reviewAdded.review.content}
          </div>
        )}
      </section>
    )}
  </Subscription>
);

export default FilmReviewSubscriber;
