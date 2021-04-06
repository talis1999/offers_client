import { useState } from "react";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
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

const Register = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const { error, success } = cogoToast;

  const history = useHistory();

  const handleErrors = async () => {
    let newErrors = {};
    await setErrors({});
    if (email.toString().length === 0)
      newErrors.email = "This field is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

    if (password.length === 0) newErrors.password = "This field is required";
    else if (password.length < 6)
      newErrors.casualties = "This password is too short";

    if (phone.length === 0) newErrors.phone = "This field is required";
    else if (
      !/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
        phone
      )
    )
      newErrors.phone = "Invalid phone number";

    if (Object.keys(newErrors).length === 0) {
      setErrors(newErrors);
      return true; // returns true so the conditional statement will pass
    } else {
      await setErrors(newErrors);
      return false; // returns true so the conditional statement will fail
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (await handleErrors()) {
      try {
        await axios.post(
          "http://localhost:8080/user/",
          {
            email,
            password,
            phone,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        success("Registered successfully");
        history.push("/");
      } catch (e) {
        error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={submit} noValidate={true}>
      <Card className={classes.root}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          REGISTER
        </Typography>
        <TextField
          className={classes.textfield}
          id="email"
          label="email"
          variant="outlined"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors["email"])}
          helperText={errors["email"]}
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
          error={Boolean(errors["password"])}
          helperText={errors["password"]}
        />
        <TextField
          className={classes.textfield}
          id="phone"
          label="phone"
          variant="outlined"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
          error={Boolean(errors["phone"])}
          helperText={errors["phone"]}
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </Card>
    </form>
  );
};

export default Register;
