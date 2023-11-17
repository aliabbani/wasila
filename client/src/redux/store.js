import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
// We use redux presist whcihc help us add the user data in the local storage
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

// setting the name of the key on the local storage
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);