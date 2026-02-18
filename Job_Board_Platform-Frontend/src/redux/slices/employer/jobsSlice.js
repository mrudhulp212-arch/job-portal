import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    employerJobs:[],
    LoadingEmployerJobs:true
}

export const employerJobsSlice = createSlice({
  name: 'employerJobs',
  initialState,
  reducers: {
    setEmployerJobs: (state, action) => {
      state.employerJobs = action.payload;
    }
  }
})

export const { setEmployerJobs } = employerJobsSlice.actions

export default employerJobsSlice.reducer