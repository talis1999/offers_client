import AppBar from "./AppBar";
import { useContext, useState, useMemo } from "react";
import { OffersContext } from "./OffersProvider";
import OfferCard from "./OfferCard";
import AddOffer from "./AddOffer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardsWrap: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    justifyContent: "space-between",
  },
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <AppBar />
      <div className={classes.cardsWrap}>{offerList}</div>
      <AddOffer />
    </div>
  );
}
