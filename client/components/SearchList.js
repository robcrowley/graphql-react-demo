import React from "react";
import Link from "next/link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const SEARCH = gql`
  query Search($query: String) {
    search(query: $query) {
      edges {
        node {
          ... on Film {
            __typename
            id
            filmId
            title
            description
          }

          ... on Actor {
            __typename
            id
            name
          }

          ... on Character {
            __typename
            id
            name
          }

          ... on Director {
            __typename
            id
            name
          }
        }
      }
    }
  }
`;

const SearchResults = ({ query }) => (
  <Query query={SEARCH} variables={{ query }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <section>
          <ul className="list-group">
            {data.search.edges.map((result, index) => (
              <li key={result.node.id} className="list-group-item">
                {result.node.__typename === "Film" && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{result.node.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {result.node.__typename}
                      </h6>
                      <p className="card-text">{result.node.description}</p>
                      <Link
                        href={{
                          pathname: "/reviews",
                          query: { filmId: result.node.filmId }
                        }}
                      >
                        <a className="card-link">Reviews</a>
                      </Link>
                    </div>
                  </div>
                )}
                {(result.node.__typename === "Actor" ||
                  result.node.__typename === "Character" ||
                  result.node.__typename === "Director") && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{result.node.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {result.node.__typename}
                      </h6>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      );
    }}
  </Query>
);

class SearchList extends React.Component {
  state = { query: null };

  onQueryChanged = ({ target }) => {
    this.setState(() => ({ query: target.value }));
  };

  render() {
    return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="queryInput"
                placeholder="Enter query"
                onChange={this.onQueryChanged}
              />
            </div>
          </form>
        </div>
        {this.state.query && <SearchResults query={this.state.query} />}
      </div>
    );
  }
}

export default SearchList;
