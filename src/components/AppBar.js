import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cookies from "js-cookie";
import cogoToast from "cogo-toast";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  topBar: { padding: "8px", backgroundColor: "#d94b3d" },
}));

export default function HomeAppBar() {
  const classes = useStyles();
  const [, setLoggedIn] = useContext(AuthContext);
  const { success } = cogoToast;

  const logOut = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("loggedIn");
    setLoggedIn(false);
    success("Logged out successfully");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.topBar}>
        <Toolbar>
          <ShoppingCartIcon fontSize="large" />
          <Typography variant="h5" className={classes.title}>
            OFFER
          </Typography>
          <Button color="inherit" onClick={() => logOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
