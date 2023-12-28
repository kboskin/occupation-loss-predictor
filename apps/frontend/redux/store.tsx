import {configureStore} from '@reduxjs/toolkit'
import {lossesApi} from "./losses/lossesApi";

export const store = configureStore({
    reducer: {
        [lossesApi.reducerPath]: lossesApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(lossesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
