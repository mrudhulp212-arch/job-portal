import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    employerCompanies:[],
    LoadingEmployerCompanies:true
}

export const employerCompaniesSlice = createSlice({
  name: 'employerCompanies',
  initialState,
  reducers: {
    setEmployerCompanies: (state, action) => {
      state.employerCompanies = action.payload;
    }
  }
})

export const { setEmployerCompanies } = employerCompaniesSlice.actions

export default employerCompaniesSlice.reducer