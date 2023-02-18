import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConfigState } from '../redux.types'

const initialState: IConfigState = {
  music: true,
  sfx: true,
  vibrate: true,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<boolean>) => {
      state.music = action.payload
    },
    setSfx: (state, action: PayloadAction<boolean>) => {
      state.sfx = action.payload
    },
    setVibrate: (state, action: PayloadAction<boolean>) => {
      state.vibrate = action.payload
    },

    clearConfig: state => Object.assign(state, initialState),
  },
})

export const { setMusic, setSfx, setVibrate, clearConfig } = configSlice.actions
export default configSlice.reducer
