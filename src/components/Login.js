import { useState, useContext } from "react";
import { AuthContext } from "./authContext";
import cogoToast from "cogo-toast";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    maxWidth: "20%",
    minWidth: "300px",
    margin: "auto",
    marginTop: "10%",
  },
  textfield: {
    margin: "8px",
    width: "80%",
  },
  title: {
    color: "#d94b3d",
    margin: "16px 0px",
  },
  button: {
    padding: "12px 32px",
    margin: "16px 0px",
    border: "#d94b3d 1px solid",
    color: "#d94b3d",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoggedIn] = useContext(AuthContext);

  const { error, warn, success } = cogoToast;

  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (email && password) {
      try {
        const res = await axios.post(
          "http://localhost:8080/user/login",
          {
            email,
            password,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const token = res.data;
        Cookies.set("token", token, { expires: 1 });
        setLoggedIn(true);
        success("Logged in successfully");
      } catch (e) {
        error("Invalid email/ password");
      }
    } else {
      warn("Please, fill both of the fields");
    }
  };

  return (
    <form onSubmit={submit} noValidate={true}>
      <Card className={classes.root}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          LOGIN
        </Typography>
        <TextField
          className={classes.textfield}
          id="email"
          label="email"
          variant="outlined"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.textfield}
          id="password"
          label="password"
          variant="outlined"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </Card>
    </form>
  );
};

export default Login;
