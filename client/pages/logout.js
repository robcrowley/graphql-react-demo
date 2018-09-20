import App from "../components/App";

export default () => (
  <App>
    {sessionStorage && sessionStorage.removeItem("token")}
    <div>
      <h3>You have successfully logged out.</h3>
    </div>
  </App>
);
