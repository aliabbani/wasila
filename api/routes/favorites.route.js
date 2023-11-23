import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { test, addFavorites, removeFavorites, getFavorites, getUserFavoriteListings } from '../controllers/favorites.controller.js';

const router = express.Router();

router.get('/test', test);

router.post('/add', verifyToken, addFavorites);
router.get('/get/:userId', verifyToken, getFavorites);
router.delete('/delete', verifyToken, removeFavorites);
router.get('/:userId',verifyToken, getUserFavoriteListings);

export default router;