import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConfigState } from '../redux.types'

const initialState: IConfigState = {
  sfx: true,
  music: true,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setSfx: (state, action: PayloadAction<boolean>) => {
      state.sfx = action.payload
    },
    setMusic: (state, action: PayloadAction<boolean>) => {
      state.music = action.payload
    },

    clearConfig: state => Object.assign(state, initialState),
  },
})

export const { setSfx, setMusic, clearConfig } = configSlice.actions
export default configSlice.reducer
