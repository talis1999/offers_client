import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { AuthContext } from "./AuthContext";

export default function Root() {
  const [loggedIn] = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={loggedIn ? Home : Login} />
        {!loggedIn && <Route path="/register" component={Register} />}
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
}
