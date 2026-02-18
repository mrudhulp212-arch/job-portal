import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    user:{},
    isLoggedIn: false,
    isLoading:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticatUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      
    },
    unAuthenticatUser: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})

export const { authenticatUser, unAuthenticatUser, setisLoading } = userSlice.actions

export default userSlice.reducer