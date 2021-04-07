import AppBar from "./AppBar";
import { useContext, useState, useMemo } from "react";
import { OffersContext } from "./OffersProvider";
import OfferCard from "./OfferCard";

export default function Home() {
  const { filtheredOffers } = useContext(OffersContext);
  const [offerList, setOfferList] = useState([]);

  const generateOfferList = async () => {
    const offerCards = filtheredOffers.map((offer) => <OfferCard {...offer} />);
    setOfferList(offerCards);
  };
  useMemo(() => generateOfferList(), [filtheredOffers]);
  return (
    <div>
      <AppBar />
      {offerList}
    </div>
  );
}
