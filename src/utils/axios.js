import axios from 'axios'
import { clearUser } from '../features/user/userSlice'

axios.defaults.withCredentials = true
const customFetch = axios.create({
  // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
  // baseURL: 'http://127.0.0.1:5100/api/v1/toolkit',
  baseURL: 'https://jobster-backend.onrender.com/api/v1/toolkit',
})

const logoutMessage = 'Unauthorized! Logging out...'
export const checkIfUnauthorized = (thunkAPI, error) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearUser(logoutMessage))
    return thunkAPI.rejectWithValue(logoutMessage)
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch
