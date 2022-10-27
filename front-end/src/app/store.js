import { configureStore } from '@reduxjs/toolkit';

import dataReducer from '../features/dataSlice';

export function makeStore() {
  return configureStore({
    reducer: { dataSlice: dataReducer },
  });
}

const store = makeStore();

export default store;