import { IUser } from '@/models/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../redux.types'

const initialState: IUserState = {
  userObj: undefined,
  testNum: 2,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userObj = action.payload
    },
    setTestNum: (state, action: PayloadAction<number>) => {
      state.testNum = action.payload
    },
    clearUser: state => Object.assign(state, initialState),
  },
})

export const { setUser, setTestNum, clearUser } = userSlice.actions
export default userSlice.reducer
