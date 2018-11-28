import App from "../components/App";
import { ApolloConsumer } from "react-apollo";

export default () => (
  <App>
    {sessionStorage && sessionStorage.removeItem("token")}
    {<ApolloConsumer>{client => { client.resetStore(); return null; } }</ApolloConsumer>}
    <div>
      <h3>You have successfully logged out.</h3>
    </div>
  </App>
);
