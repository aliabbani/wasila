import Favorites from "../models/favorites.model.js";
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
    res.status(200).json("Product added to favorites!");
  } catch (error) {
    next(error);
  }
};

export const removeFavorites = async (req, res, next) => {
  const { userId, listingId } = req.body;

  try {
    await Favorites.findOneAndDelete({ userId, listingId });
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorites.find({ userId });
    console.log("favorites", favorites);
    const listingIds = favorites.map(f => f.listingId);
    console.log("listingIds", listingIds);
    res.status(200).json({ listings: listingIds });
  } catch (error) {
    next(error);
  }
};

// app.get('/api/favorites/:userId', async (req, res) => {
//   const { userId } = req.params;

//   // Fetch favorite list for the user
//   const favorites = await Favorite.find({ userId });
//   const productIds = favorites.map(favorite => favorite.productId);

//   res.status(200).json({ products: productIds });
// });
