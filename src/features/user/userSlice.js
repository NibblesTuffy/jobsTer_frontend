import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  addUserLocalStorage,
  getUserFromLocalStorage,
  removeUserLocalStorage,
  updateLocalStorage,
} from '../../utils/localStorage'

import { clearAllJobs } from '../allJobs/allJobsSlice'
import { clearJobSlice } from '../job/jobSlice'
const initialState = {
  isLoading: false,
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user)
      // console.log(resp)
      addUserLocalStorage(resp.data.user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user)
      return resp.data
    } catch (error) {
      // console.log(`catch user ${error}`);
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'type/updateUser',
  async (user, thunkAPI) => {
    try {
      // console.log(`user send to backend `);
      // console.log(user);
      // console.log(JSON.parse(thunkAPI.getState().user.user).token)
      const resp = await customFetch.patch(
        '/auth/updateUser',
        user
        // authHeader(thunkAPI)
      )
      return resp.data
    } catch (error) {
      // 400 Bad Request is the status code to return when the form of the client request is not as the API expects.
      // 401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials.
      //if 401 returened, logout
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const clearUser = createAsyncThunk(
  'type/clearUser',
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message))
      thunkAPI.dispatch(clearJobSlice())
      thunkAPI.dispatch(clearAllJobs())
      await customFetch.get('/auth/logout')
      return Promise.resolve()
    } catch (error) {
      return Promise.reject('Clear User Data Error...')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserLocalStorage()
      toast.success(payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, data) => {
        //the structure of data()testingRegister
        /*{  "type":"user/registerUser/fulfilled",
              "payload":{
                  "user":{"email":"john@gmail.com","name":"john","lastName":"testing last name","location":"testing location","token":"testing token"}},
                  "meta":{"arg":
                          {"name":"john","email":"john@gmail.com","password":"secret"},
                          "requestId":"oeRNKjGLk8awh-r0b9_de","requestStatus":"fulfilled"}} */

        console.log(`register User... ${data}`)
        console.log(data)
        state.isLoading = false
        const { user } = data.payload
        state.user = user
        addUserLocalStorage(user)
        toast.success(`Hello ${user.name}! Welcome to JobTracker!`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        // console.log(`error ${data}`)
        // console.log(data);
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const { user } = payload
        state.user = user
        addUserLocalStorage(user)
        toast.success(`Welcome back ${user.name} 😀`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log('login rejected')
        toast.error(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        // const {name, lastName,email,location} = payload.updatedUser
        updateLocalStorage(payload.updatedUser)
        state.user = payload.updatedUser
        console.log(payload)
        toast.success(`update successfully!`)
      })

      .addCase(updateUser.rejected, (state, { payload }) => {
        // console.log(data)
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(clearUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions
export default userSlice.reducer
