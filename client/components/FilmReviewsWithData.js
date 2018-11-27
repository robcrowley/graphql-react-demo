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
            isFavourite @client
          }
        }
      }
    }
  }
`;

const FILM_REVIEWS_SUBSCRIPTION = gql`
  subscription onReviewAdded {
    reviewAdded {
      film {
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
              isFavourite @client
            }
          }
        }
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
              document: FILM_REVIEWS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                return subscriptionData.data.reviewAdded.film;
              }
            })
          }
        />
      );
    }}
  </Query>
);

export default FilmReviewsWithData;
