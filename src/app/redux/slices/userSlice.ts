import { IUser } from '@/models/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../redux.types'

const initialState: IUserState = {
    userObj: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.userObj = action.payload
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
