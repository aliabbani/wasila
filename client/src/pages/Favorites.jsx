import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingItem from "../components/ListingItem";

const Favorites = ({ listing }) => {
  const [userFavoriteListings, setUserFavoriteListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`/api/favorites/${userId}`);
      const data = await res.json();
      setUserFavoriteListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavorite = async (listingId) => {
    try {
      await fetch(`/api/favorites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, listingId }),
      });

      // Update local state to reflect the removed listing
      setUserFavoriteListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div>Favorites</div>
      {userFavoriteListings.map((listing) => (
        <ListingItem 
          key={listing._id}
          listing={listing}
          handleRemoveFavorite={handleRemoveFavorite}
        />
      ))}
    </div>
  );
};

export default Favorites;
