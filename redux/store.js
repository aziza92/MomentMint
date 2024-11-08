import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageReducer from './imageSlice';


// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  images: imageReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export  const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

//export const persistor = persistStore(store);