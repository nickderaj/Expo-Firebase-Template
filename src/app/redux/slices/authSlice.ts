import { LoginEnum } from '@/models/Auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from '../redux.types'

const initialState: IAuthState = {
  loginMethod: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginMethod: (state, action: PayloadAction<LoginEnum>) => {
      state.loginMethod = action.payload
    },
    logout: state => Object.assign(state, initialState),
  },
})

export const { setLoginMethod, logout } = authSlice.actions
export default authSlice.reducer
