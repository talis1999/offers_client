import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { AuthContext } from "./authContext";

export default function Root() {
  const [loggedIn] = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={loggedIn ? Home : Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}
