import { LoginEnum } from '@/models/Auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from '../redux.types'

const initialState: IAuthState = {
  loginMethod: undefined,
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
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    logout: state => Object.assign(state, initialState),
  },
})

export const { setLoginMethod, setEmail, setName, logout } = authSlice.actions
export default authSlice.reducer
