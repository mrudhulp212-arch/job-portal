import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import employeeSavedJobsReducer from './slices/employee/savedJobsSlice'
import employerJobsReducer from './slices/employer/jobsSlice'
import employerCompaniesReducer from './slices/employer/companiesSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    employeeSavedJobs: employeeSavedJobsReducer,
    employerJobs: employerJobsReducer,
    employerCompanies: employerCompaniesReducer
  }
})