import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    listingId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);

export default Favorites;
