import { configureStore } from '@reduxjs/toolkit';
import siteReducer from './siteReducer';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage?.getItem('reduxState')!) : {};

const store = configureStore({
    reducer: {
        site: siteReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
    preloadedState: persistedState
});

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
