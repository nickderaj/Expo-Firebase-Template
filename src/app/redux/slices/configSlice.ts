import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConfigState } from '../redux.types'

const initialState: IConfigState = {
  music: true,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<boolean>) => {
      state.music = action.payload
    },

    clearConfig: state => Object.assign(state, initialState),
  },
})

export const { setMusic, clearConfig } = configSlice.actions
export default configSlice.reducer
