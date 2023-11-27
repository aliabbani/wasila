import Favorites from "../models/favorites.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

// **test it**
export const test = (req, res) => {
  res.json({
    message: "Favorite route is working!",
  });
};

export const addFavorites = async (req, res, next) => {
  const { userId, listingId } = req.body;

  const existingFavorite = await Favorites.findOne({ userId, listingId });
  if (existingFavorite) {
    return res.status(400).json({ message: "Product already in favorites" });
  }

  try {
    const newFavorite = new Favorites({ userId, listingId });
    await newFavorite.save();
    res.status(200).json({ message: "Listing added to favorites", success: true });
  } catch (error) {
    console.error("Error adding favorite:", error);
    next(error);
  }
};

export const removeFavorites = async (req, res, next) => {
  const { userId, listingId } = req.body;

  try {
    await Favorites.findOneAndDelete({ userId, listingId });
    res.status(200).json({ message: "Listing removed from favorites", success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorites.find({ userId });
    // console.log("favorites", favorites);
    const listingIds = favorites.map((f) => f.listingId);
    // console.log("listingIds", listingIds);
    res.status(200).json({ listings: listingIds });
    // res.status(200).json(favorites)
  } catch (error) {
    next(error);
  }
};

// get specific user's favorite listings
export const getUserFavoriteListings = async (req, res, next) => {
  const userId = req.params.userId;

  // Get all favorite listings for the user
  try {
    const favoriteListings = await Favorites.find({ userId });
    const listingIds = favoriteListings.map((f) => f.listingId);

    // Fetch all listings based on favorite IDs
    const listings = await Listing.find({ _id: { $in: listingIds } });

    res.status(200).json( listings );
  } catch (error) {
    next(error);
  }
};
