import {
  AnyAction,
  combineReducers,
  configureStore,
  PreloadedState,
  Reducer,
} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import configReducer from './slices/configSlice'

export const combinedReducer = combineReducers({
  user: userReducer,
  config: configReducer,
})

const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ reducer: combinedReducer, preloadedState })
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/clearUser') state = {} as RootState
  return combinedReducer(state, action)
}

export const store = configureStore({ reducer: rootReducer })
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof combinedReducer>
export type ReduxState = ReturnType<typeof store.getState>
