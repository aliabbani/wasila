import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ListingItem({ listing, handleRemoveFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  // console.log("isFavorite", isFavorite);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  useEffect(() => {
    const favoritesCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("favorites="));
    // console.log("favoritesCookie", favoritesCookie)
    if (favoritesCookie) {
      const favorites = favoritesCookie.split("=")[1].split(",");
      // console.log("favorites in the useEffect", favorites)
      setIsFavorite(favorites.includes(listing._id));
    }
  }, [listing._id]);

  const handleFavoriteClick = async () => {
    const listingId = listing._id;
    const favoritesCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("favorites="));

    let favorites = [];

    if (favoritesCookie) {
      favorites = favoritesCookie.split("=")[1].split(",");
    }

    if (isFavorite) {
      favorites = favorites.filter((id) => id !== listingId);
      await fetch(`/api/favorites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, listingId }),
      });

      // If handleRemoveFavorite is provided, call it to remove the listing immediately.
      if (handleRemoveFavorite) {
        handleRemoveFavorite(listingId);
      }
    } else {
      favorites.push(listingId);
      await fetch(`/api/favorites/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, listingId }),
      });
    }

    document.cookie = `favorites=${favorites.join(",")}; path=/`;
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <Link to={`/listing/${listing._id}`}>
            <p className="truncate text-lg font-semibold text-slate-700">
              {listing.name}
            </p>
          </Link>
          <button onClick={handleFavoriteClick} type="button">
            <GrFavorite
              className={`truncate text-lg font-semibold cursor-pointer ${
                isFavorite ? "text-red-500" : "text-slate-700 "
              }`}
            />
          </button>
        </div>
        <Link to={`/listing/${listing._id}`}>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
