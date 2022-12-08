import { LoginEnum } from '@/models/Auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from '../redux.types'

const initialState: IAuthState = {
  loginMethod: undefined,
  token: '',
  email: '',
  name: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginMethod: (state, action: PayloadAction<LoginEnum>) => {
      state.loginMethod = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    clearAuth: state => Object.assign(state, initialState),
  },
})

export const { setLoginMethod, setToken, setEmail, setName, clearAuth } = authSlice.actions
export default authSlice.reducer
