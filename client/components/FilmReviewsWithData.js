import gql from "graphql-tag";
import { Query } from "react-apollo";
import FilmReviews from "./FilmReviews";

export const FILM_REVIEWS_QUERY = gql`
  query FilmReviews($filmId: Int!) {
    film(filmId: $filmId) {
      __typename
      id
      filmId
      title
      description
      releasedOn
      reviews {
        edges {
          node {
            __typename
            id
            reviewId
            content
            rating
            createdAt
          }
        }
      }
    }
  }
`;

const FILM_REVIEWS_SUBSCRIPTION = gql`
  subscription onReviewAdded {
    reviewAdded {
      review {
        __typename
        id
        reviewId
        content
        rating
        createdAt
      }
    }
  }
`;

const FilmReviewsWithData = ({ filmId }) => (
  <Query query={FILM_REVIEWS_QUERY} variables={{ filmId }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <FilmReviews
          reviews={data.film.reviews}
          subscribeToNewReviews={() =>
            subscribeToMore({
              document: FILM_REVIEWS_SUBSCRIPTION
            })
          }
        />
      );
    }}
  </Query>
);

export default FilmReviewsWithData;
