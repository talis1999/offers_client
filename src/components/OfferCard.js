import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles(() => ({
  cardWrap: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    margin: "8px",
    width: "20vw",
    minWidth: "300px",
  },
  description: {
    fontStyle: "italic",
    padding: "8px",
    height: "10vh",
    overflowY: "auto",
  },
  contact: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#71777c",
    padding: "4px",
  },
  header: { display: "flex", alignItems: "center" },
  headerDivider: { margin: "0px 8px" },
  link: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#CCE4E5",
    },
  },
}));

const OfferCard = ({ title, type, description, email, phone }) => {
  const classes = useStyles();
  return (
    <Paper square className={classes.cardWrap}>
      <div className={classes.header}>
        <Typography variant="h5">{title}</Typography>
        <Divider
          className={classes.headerDivider}
          orientation="vertical"
          flexItem
        />
        <Typography variant="subtitle1">{type}</Typography>
      </div>

      <Divider />
      <Typography variant="subtitle1" className={classes.description}>
        {`"${description}"`}
      </Typography>
      <Divider />
      <a href={`mailto:${email}`} className={classes.link}>
        <Typography variant="subtitle1" className={classes.contact}>
          <MailIcon />
          {email}
        </Typography>
      </a>
      <a href={`tel:+${phone}`} className={classes.link}>
        <Typography variant="subtitle1" className={classes.contact}>
          <PhoneIcon />
          {phone}
        </Typography>
      </a>
    </Paper>
  );
};
export default OfferCard;
