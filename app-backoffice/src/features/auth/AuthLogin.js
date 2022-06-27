const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYmFja29mZmljZSJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJiYWNrb2ZmaWNlIiwieC1oYXN1cmEtYWRtaW4taWQiOiJtcGcifX0.wdkjTn5ArXah51yiC2VYi5DivAZSd1N_ITn8ny9Uwt8";

export const AuthLogin = ({ setToken }) => (
  <form
    onSubmit={(evt) => {
      evt.preventDefault();
      setToken(evt.target[0].value);
    }}
    style={{ margin: 10 }}
  >
    <h4>Add the JWT Token:</h4>
    <input type="text" name="token" />
    <button type="submit">Login</button>
    <hr />
    <p onClick={() => setToken(JWT)}>Login with fake token</p>
  </form>
);
