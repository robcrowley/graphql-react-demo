import React from "react";
import FavouriteReview from "./FavouriteReview"

export default class extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewReviews();
  }

  render() {
    return (
      <section>
        <ul className="list-group">
          {this.props.reviews.edges.map(({ node }) => (
            <li key={node.id} className="list-group-item">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{node.content}</p>
                  <FavouriteReview id={node.id} isFavourite={node.isFavourite} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
