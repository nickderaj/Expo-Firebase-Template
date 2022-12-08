import {
  AnyAction,
  combineReducers,
  configureStore,
  PreloadedState,
  Reducer,
} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'

export const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})

const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ reducer: combinedReducer, preloadedState })
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/clearAuth') state = {} as RootState
  return combinedReducer(state, action)
}

export const store = configureStore({ reducer: rootReducer })
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof combinedReducer>
export type ReduxState = ReturnType<typeof store.getState>
