import App from "../components/App";
import gql from "graphql-tag";
import Router from "next/router";
import { Mutation } from "react-apollo";

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      clientMutationId
      token
    }
  }
`;

let username, password;

export default () => (
  <App>
    <Mutation
      mutation={LOGIN}
      onCompleted={data => sessionStorage.setItem("token", data.login.token)}
    >
      {(login, { data }) => (
        <div>
          <form
            onSubmit={async e => {
              e.preventDefault();
              await login({
                variables: {
                  input: {
                    username: username.value,
                    password: password.value
                  }
                }
              });
              username.value = "";
              password.value = "";
              Router.push({ pathname: "/" });
            }}
          >
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Enter username"
                autoComplete="nope"
                ref={node => {
                  username = node;
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Enter password"
                autoComplete="current-password"
                ref={node => {
                  password = node;
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </Mutation>
  </App>
);
