import gql from "graphql-tag";
import { Query } from "react-apollo";
import Bookmark from "./Bookmark";
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
    bookmarks @client {
      reviews
    }
  }
`;

const FILM_REVIEWS_SUBSCRIPTION = gql`
  subscription onReviewAdded($id: ID, $filmId: Int) {
    reviewAdded(id: $id, filmId: $filmId) {
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
          reviews={data.film.reviews.edges.map(({node}) => node)}
          subscribeToNewReviews={() =>
            subscribeToMore({
              document: FILM_REVIEWS_SUBSCRIPTION,
              variables: { filmId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                return subscriptionData.data.reviewAdded.film;
              }
            })
          }
        >
        {review => (
          <Bookmark id={review.id} isBookmarked={data.bookmarks.reviews.includes(review.id)} />
        )}
        </FilmReviews>
      );
    }}
  </Query>
);

export default FilmReviewsWithData;
