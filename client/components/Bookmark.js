import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

const TOGGLE_BOOKMARK = gql`
  mutation ToggleBookmark($id: ID!) {
    toggleBookmark(id: $id) @client
  }
`;

const Bookmark = ({ id, isBookmarked }) => (
  <Mutation mutation={TOGGLE_BOOKMARK} variables={{ id }}>
    {toggleBookmark => (
      <button type="button" className="btn btn-primary" onClick={toggleBookmark}>
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    )}
  </Mutation>
);

export default Bookmark;