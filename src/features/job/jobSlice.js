import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch, { checkIfUnauthorized } from '../../utils/axios'
import { toast } from 'react-toastify'

import {
  getAllJobs,
  hideAllJobsLoading,
  showAllJobsLoading,
} from '../allJobs/allJobsSlice'

import { JOB_LOCATION, JOB_STATUS, JOB_TYPE } from '../../utils/constants'

const initialState = {
  isLoading: false,
  company: '',
  position: '',
  jobLocation: JOB_LOCATION.MELBOURNE,
  jobLocationOptions: Object.values(JOB_LOCATION),
  jobTypeOptions: Object.values(JOB_TYPE),
  jobType: JOB_TYPE.FULL_TIME,
  statusOptions: Object.values(JOB_STATUS),
  status: JOB_STATUS.PENDING,
  isEdit: false,
  editJobID: '',
  applyDate:''
}

export const addJob = createAsyncThunk(
  'type/addJob',
  async (user, thunkAPI) => {
    try {
      console.log('add job')
      const resp = await customFetch.post('/jobs', user)

      // console.log(resp.data)
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      // console.log(error);
      checkIfUnauthorized(thunkAPI, error)
    }
  }
)

export const deleteJob = createAsyncThunk(
  'type/deleteJob',
  async (jobID, thunkAPI) => {
    try {
      // const dispatch = useDispatch()
      thunkAPI.dispatch(showAllJobsLoading())
      
      const resp = await customFetch.delete(
        `/jobs/${jobID}`,
        // authHeader(thunkAPI)
      )
      // console.log(`delete ${resp}`)

      thunkAPI.dispatch(getAllJobs())

      return resp.data
    } catch (error) {
      thunkAPI.dispatch(hideAllJobsLoading())
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      checkIfUnauthorized(thunkAPI, error)
    }
  }
)

export const editJob = createAsyncThunk(
  'type/editJob',
  async (editJob, thunkAPI) => {
    try {
      // console.log(`editing job...`)
      const { editJobID, position, jobType, jobLocation, company, status , applyDate} =
        editJob

      const jobContent = {
        editJobID,
        position,
        jobType,
        jobLocation,
        company,
        status,
        applyDate,
      }
      const resp = await customFetch.patch(
        `/jobs/${editJobID}`,
        jobContent,
        // authHeader(thunkAPI)
      )

      thunkAPI.dispatch(clearValues())
      console.log(resp)
    } catch (error) {
      // if (error.response.status === 401) {
      //   thunkAPI.dispatch(logoutUser())
      //   thunkAPI.dispatch(hideAllJobsLoading())
      //   return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
      // }
      thunkAPI.dispatch(hideAllJobsLoading())
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      // return thunkAPI.rejectWithValue(error.response.data.msg)
      checkIfUnauthorized(thunkAPI, error)
    }
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    changeJobInput: (state, { payload }) => {
      return { ...state, [payload.name]: payload.value }
    },
    clearValues: (state) => {
      return { ...initialState }
    },
    setEdit: (state, { payload }) => {
      state.isEdit = true

      state.editJobID = payload._id
      state.position = payload.position
      state.company = payload.company
      state.jobLocation = payload.jobLocation
      state.jobType = payload.jobType
      state.status = payload.status
      state.applyDate = payload.applyDate
    },
    clearJobSlice: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('Add job successfully!')
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success(payload.msg)
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true
        state.isEdit = true
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false
        state.isEdit = false

        toast.success(`Edit successfully 😀`)
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isEdit = false
        console.log(payload)
        // toast.error(payload)
      })
  },
})

export default jobSlice.reducer

export const { changeJobInput, clearValues, setEdit, clearJobSlice } =
  jobSlice.actions
