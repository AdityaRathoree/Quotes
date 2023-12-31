import { createSlice } from '@reduxjs/toolkit'

export const profilePicSlice = createSlice({
  name: 'pic',
  initialState: {
    status: "https://ik.imagekit.io/major/images/usernameimg.png?updatedAt=1692701128252",
  },
  reducers: {
    picUpload: (state,action) => {
      state.status = action.payload.url;
    },
  },
})

export const { picUpload } = profilePicSlice.actions
export default profilePicSlice.reducer
