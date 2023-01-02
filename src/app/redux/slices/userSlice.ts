import { LoginEnum } from '@/models/Auth'
import { IUser } from '@/models/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../redux.types'

const initialState: IUserState = {
  loginMethod: undefined,
  email: '',
  name: '',
  userObj: undefined,
}

export const userSlice = createSlice({
  name: 'user',
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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userObj = action.payload
    },
    clearUser: state => Object.assign(state, initialState),
  },
})

export const { setUser, setLoginMethod, setEmail, setName, clearUser } = userSlice.actions
export default userSlice.reducer
