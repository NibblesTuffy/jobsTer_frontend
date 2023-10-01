import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/features/user/userSlice'
import jobReducer from '../src/features/job/jobSlice'
import allJobsReducer from '../src/features/allJobs/allJobsSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
})
