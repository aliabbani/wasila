import express from 'express';
// import { test, createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { test, addFavorites, removeFavorites, getFavorites } from '../controllers/favorites.controller.js';

const router = express.Router();

router.get('/test', test);

router.post('/add', verifyToken, addFavorites);
router.get('/get/:userId', getFavorites);
router.delete('/delete', verifyToken, removeFavorites);


export default router;