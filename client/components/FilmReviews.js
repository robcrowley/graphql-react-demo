import React from "react";

export default class extends React.Component {
  componentDidMount() {
    if (typeof this.props.subscribeToNewReviews === "function") {
      this.props.subscribeToNewReviews();
    }
  }

  render() {
    return (
      <section>
        <ul className="list-group">
          {this.props.reviews.map(review => (
            <li key={review.id} className="list-group-item">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">{review.content}</p>
                  {this.props.children && this.props.children(review)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
