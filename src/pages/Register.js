import React, { useEffect, useState } from 'react'
import { FormRow, FormRowSelect, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { JOB_LOCATION } from '../utils/constants'

const initialStates = {
  name: '',
  password: '',
  email: '',
  isMember: '',
  lastName: '',
  location: JOB_LOCATION.MELBOURNE,
}
const Register = () => {
  const [values, setValues] = useState(initialStates)
  const { user } = useSelector((store) => store.user)
  // const { jobLocationOptions } = useSelector((store) => store.job)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember, location, lastName } = values
    if (!email || !password || (!isMember && !name && location && lastName)) {
      toast.error('Please fill all the fields!')
      return
    }

    if (isMember) {
      console.log({ email, password })
      dispatch(loginUser({ email, password }))
      return
    }
    console.log({ name, email, password, lastName, location })
    dispatch(registerUser({ name, email, password, lastName, location }))
    return
  }

  //when the user has logged in...or every time the user changes...
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
      console.log(user)
    }
    // console.log(`from useEffect... ${user}`)
  }, [user, navigate])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        {values.isMember ? <h3>LogIn</h3> : <h3>Register</h3>}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={values.lastName}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRowSelect
            name="location"
            value={values.location}
            options={Object.values(JOB_LOCATION)}
            handleChange={handleChange}
          />
        )}

        {values.isMember ? (
          <p>
            Not a member yet? Click here to{' '}
            <span className="member-btn" onClick={toggleMember}>
              register
            </span>
          </p>
        ) : (
          <p>
            Already a member? Click here to{' '}
            <span className="member-btn" onClick={toggleMember}>
              login
            </span>
          </p>
        )}

        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Register
