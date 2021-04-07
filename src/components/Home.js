import AppBar from "./AppBar";
import { useContext, useState, useMemo } from "react";
import { OffersContext } from "./OffersProvider";
import OfferCard from "./OfferCard";
import AddOffer from "./AddOffer";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardsWrap: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    justifyContent: "center",
    padding: "8px",
  },
  offset: theme.mixins.toolbar,
}));

export default function Home() {
  const classes = useStyles();
  const { filtheredOffers } = useContext(OffersContext);
  const [offerList, setOfferList] = useState([]);

  const generateOfferList = async () => {
    const offerCards = filtheredOffers.map((offer) => <OfferCard {...offer} />);
    setOfferList(offerCards);
  };
  useMemo(() => {
    generateOfferList();
  }, [filtheredOffers]);
  return (
    <div>
      <AppBar />
      <div className={classes.offset} />
      <NavBar />
      <Divider />
      <div className={classes.cardsWrap}>{offerList}</div>
      <AddOffer />
    </div>
  );
}
