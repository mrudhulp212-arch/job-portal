import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    employeeSavedJobs:[],
    LoadingEmployeeSavedJobs:true
}

export const employeeSavedJobsSlice = createSlice({
  name: 'employeeSavedJobs',
  initialState,
  reducers: {
    setEmployeeSavedJobs: (state, action) => {      
      state.employeeSavedJobs = action.payload;
    }
  }
})

export const { setEmployeeSavedJobs } = employeeSavedJobsSlice.actions

export default employeeSavedJobsSlice.reducer