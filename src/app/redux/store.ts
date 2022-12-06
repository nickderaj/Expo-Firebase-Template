import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const combinedReducer = combineReducers({
    user: userReducer,
})

const setupStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({ reducer: combinedReducer, preloadedState })

export const store = configureStore({ reducer: combinedReducer })
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof combinedReducer>
export type ReduxState = ReturnType<typeof store.getState>
