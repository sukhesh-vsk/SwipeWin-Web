import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './features/walletSlice'

export const store = configureStore({
    reducer: {
        walletReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
