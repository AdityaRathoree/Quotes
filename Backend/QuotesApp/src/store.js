import { configureStore } from '@reduxjs/toolkit'
import profilePicSlice from './features/profilePicSlice'

export const store = configureStore({
  reducer: {
    pic: profilePicSlice,
  },
})
