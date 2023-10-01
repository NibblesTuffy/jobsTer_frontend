import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch, { checkIfUnauthorized } from '../../utils/axios'

import authHeader from '../../utils/authHeader'
import { toast } from 'react-toastify'

const initialFilters = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  searchStartMonth: '',
  searchEndMonth: '',
  searchLocation: 'all',
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilters,
}

export const getAllJobs = createAsyncThunk(
  'type/getAllJobs',
  async (_, thunkAPI) => {
    try {
      console.log(`get all jobs...`)
      const {
        page,
        search,
        searchStatus,
        searchType,
        sort,
        searchStartMonth,
        searchEndMonth,
        searchLocation,
      } = thunkAPI.getState().allJobs
      let url = `/jobs?&status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&startMonth=${searchStartMonth}&endMonth=${searchEndMonth}&location=${searchLocation}`
      // let url = `/jobs`

      if (search) {
        url += `&search=${search}`
      }
      const resp = await customFetch.get(url, authHeader(thunkAPI))
      // console.log(`Bearer ${thunkAPI.getState().user.user.token}`)
      // console.log(resp)
      console.log(resp.data)
      return resp.data
    } catch (error) {
      // if (error.response.status === 401) {
      //   thunkAPI.dispatch(logoutUser())
      //   return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
      // }
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      checkIfUnauthorized(thunkAPI, error)
    }
  }
)

export const getJobsStats = createAsyncThunk(
  'type/getJobsStats',
  async (_, thunkAPI) => {
    try {
      // , authHeader(thunkAPI)
      const resp = await customFetch('/jobs/stats')
      console.log(resp)
      return resp.data
    } catch (error) {
      // if (error.response.status === 401) {
      //   thunkAPI.dispatch(logoutUser())
      //   return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
      // }
      // // console.log(error);
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      checkIfUnauthorized(thunkAPI, error)
    }
  }
)

export const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showAllJobsLoading: (state) => {
      state.isLoading = true
    },
    hideAllJobsLoading: (state) => {
      state.isLoading = false
    },
    changeFilters: (state, { payload }) => {
      state[payload.name] = payload.value
    },
    removeFilters: (state) => {
      return { ...state, ...initialState }
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
    toPrevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1
      }
    },
    toNextPage: (state) => {
      if (state.page < state.numOfPages) {
        state.page += 1
      }
    },
    clearAllJobs: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllJobs.fulfilled,
        (state, { payload: { jobs, numOfPages, totalJobs } }) => {
          state.isLoading = false
          state.jobs = jobs || []
          state.numOfPages = numOfPages

          state.totalJobs = totalJobs
        }
      )
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false
        // console.log(payload)
        toast.error(payload)
      })
      .addCase(getJobsStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobsStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(getJobsStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default allJobsSlice.reducer
export const {
  showAllJobsLoading,
  hideAllJobsLoading,
  removeFilters,
  changeFilters,
  changePage,
  toPrevPage,
  toNextPage,
  clearAllJobs,
} = allJobsSlice.actions
