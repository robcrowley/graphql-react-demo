import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

const TOGGLE_FAVOURITE = gql`
  mutation ToggleFavourite($id: ID!) {
    toggleFavourite(id: $id) @client
  }
`;

const FavouriteReview = ({ id, isFavourite }) => (
  <Mutation mutation={TOGGLE_FAVOURITE} variables={{ id }}>
    {toggleFavourite => (
      <button type="button" className="btn btn-primary" onClick={toggleFavourite}>
        {isFavourite ? "Unfavourite" : "Favourite"}
      </button>
    )}
  </Mutation>
);

export default FavouriteReview;