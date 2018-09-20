import React from "react";
import App from "../components/App";
import FilmReviewWithData from "../components/FilmReviewsWithData";
import FilmReviewSubscriber from "../components/FilmReviewSubscriber";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { filmId: query.filmId };
  }

  render() {
    return (
      <App>
        <FilmReviewSubscriber />
        <FilmReviewWithData filmId={this.props.filmId} />
      </App>
    );
  }
}
