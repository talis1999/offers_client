import { useState, useContext } from "react";
import { OffersContext } from "./OffersProvider";
import { makeStyles } from "@material-ui/core/styles";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {
  Dialog,
  Button,
  FormHelperText,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  DialogContent,
  FormControl,
  DialogTitle,
  Fab,
  Divider,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    backgroundColor: "#d94b3d",
    color: "white",
    alignSelf: "flex-end",
  },
  formControl: {
    width: "100%",
  },
  title: { color: "#d94b3d" },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const { addOffer } = useContext(OffersContext);

  const handleErrors = async () => {
    let newErrors = {};
    await setErrors({});
    if (title.toString().length === 0)
      newErrors.title = "This field is required";

    if (type.length === 0) newErrors.type = "Please choose a type";

    if (description.length >= 200)
      newErrors.description = "Must be shorter than 200";

    if (Object.keys(newErrors).length === 0) {
      setErrors(newErrors);
      return true; // returns true so the conditional statement will pass
    } else {
      await setErrors(newErrors);
      return false; // returns true so the conditional statement will fail
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setType("");
    setOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (await handleErrors()) {
      addOffer({ title, type, description });
      handleClose();
    }
  };

  return (
    <div>
      <Fab onClick={handleClickOpen} className={classes.fab}>
        <NoteAddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Add Offer
        </DialogTitle>
        <Divider />
        <form onSubmit={submit} noValidate={true}>
          <DialogContent>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
              variant="outlined"
              label="Title"
              fullWidth
              required
              error={Boolean(errors["title"])}
              helperText={errors["title"]}
            />
            <FormControl
              required
              margin="dense"
              variant="outlined"
              className={classes.formControl}
              error={Boolean(errors && errors.type)}
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
              {errors && errors.type && (
                <FormHelperText>{errors.type}</FormHelperText>
              )}
            </FormControl>
            <TextField
              fullWidth
              margin="dense"
              id="description"
              label="Description"
              multiline
              rowsMax={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
