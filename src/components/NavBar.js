import { useContext } from "react";
import { OffersContext } from "./OffersProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    padding: "24px",
  },
  formControl: {
    width: "20%",
    minWidth: "200px",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { type, setType } = useContext(OffersContext);

  return (
    <div square className={classes.root}>
      <FormControl
        margin="dense"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="smartphone" id="smartphone">
            smartphone
          </MenuItem>
          <MenuItem value="computer" id="computer">
            computer
          </MenuItem>
          <MenuItem value="TV" id="TV">
            TV
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
