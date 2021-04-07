import {
  useState,
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";
import cogoToast from "cogo-toast";

export const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const { info, error, success } = cogoToast;
  const [loggedIn, setLoggedIn] = useContext(AuthContext);

  const offersReduser = (state, action) => {
    const { offers } = state;
    switch (action.type) {
      case "addOffer":
        return { offers: [...offers, action.payload.newOffer] };
      case "setOffers":
        return { offers: action.payload.newOffers };
      default:
        return state;
    }
  };
  const [offersState, offersDispatch] = useReducer(offersReduser, {
    offers: [],
  });
  const [filtheredOffers, setFiltheredOffers] = useState([]);
  const [type, setType] = useState("");

  const addOffer = async (offer) => {
    try {
      const res = await axios.post("http://localhost:8080/offers", offer, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      const newOffer = res.data;
      offersDispatch({ type: "addOffer", payload: { newOffer } });
      success("Offer has been added");
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove("token");
        sessionStorage.removeItem("loggedIn");
        setLoggedIn(false);
        info("Please login again");
      } else {
        error("Someting went wrong");
      }
    }
  };

  useEffect(async () => {
    if (loggedIn) {
      try {
        const res = await axios("http://localhost:8080/offers", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        const newOffers = res.data;
        offersDispatch({ type: "setOffers", payload: { newOffers } });
      } catch (err) {
        if (err.response.status === 401) {
          Cookies.remove("token");
          sessionStorage.removeItem("loggedIn");
          setLoggedIn(false);
          info("Please login again");
        } else {
          error("Someting went wrong");
        }
      }
    } else {
      offersDispatch({ type: "setOffers", payload: { newOffers: [] } });
    }
  }, [loggedIn]);

  useMemo(async () => {
    setFiltheredOffers(
      await offersState.offers.filter((offer) => offer.type.includes(type))
    );
  }, [offersState.offers, type]);

  return (
    <OffersContext.Provider
      value={{
        offers: offersState.offers,
        offersDispatch,
        addOffer,
        type,
        setType,
        filtheredOffers,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
