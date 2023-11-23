import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingItem from "../components/ListingItem";

const Favorites = ({ listing }) => {
  const [userFavoriteListings, setUserFavoriteListings] = useState([]);
  console.log("userFavoriteListings", userFavoriteListings);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  // http://localhost:3000/api/favorites/get/6558ba3ba9fb16fcd6867e06
  // http://localhost:3000/api/favorites/655635652138388eac7f1a15
  const fetchFavorites = async () => {
    try {
      const res = await fetch(`/api/favorites/${userId}`);
      const data = await res.json();
      setUserFavoriteListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div>Favorites</div>
      {userFavoriteListings.map((listing) => (
        <ListingItem listing={listing} key={listing._id} />
      ))}
    </div>
  );
};

export default Favorites;
