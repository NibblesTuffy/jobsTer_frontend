import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { FormRow, FormRowSelect } from '../../components'
import { updateUser } from '../../features/user/userSlice'
import { JOB_LOCATION } from '../../utils/constants'

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  // useEffect(() => {}, [userData])

  /* The ?. operator is like the . chaining operator, except that instead
            of causing an error if a reference is nullish (null or undefined),
            the expression short-circuits with a return value of undefined. When
            used with function calls, it returns undefined if the given function
            does not exist. */

  /* In false || undefined, false can't be converted to true by
            definition (since it's the opposite), so it returns the second
            operand (undefined) In undefined || false, undefined is a value, but
            considered as false in Javascript, so the logical operator evaluate
            the second operand and returns false (because both operands are
            false). */

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData
    if (!name || !email || !location || !lastName) {
      toast.error('Please provide all data')
      return
    }
    // const { name, email, lastName, location } = userData
    // console.log('handle submit')
    dispatch(updateUser(userData))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({ ...userData, [name]: value })
  }
  return (
    <Wrapper>
      <h3>Profile</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRowSelect
            type="text"
            name="location"
            value={userData.location}
            options={Object.values(JOB_LOCATION)}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
