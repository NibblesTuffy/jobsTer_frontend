import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import { toast } from 'react-toastify'
import FormRowSelect from '../../components/FormRowSelect'
import {
  addJob,
  changeJobInput,
  clearValues,
  editJob,
} from '../../features/job/jobSlice'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobLocationOptions,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEdit,
    editJobID,
    applyDate,
  } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.user)
  //   console.log(`jobLocationOptions: ${jobLocationOptions}`);
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation || !jobType || !applyDate || !status) {
      toast.error('Please provide all the fields')
      return
    }
    if (isEdit) {
      dispatch(
        editJob({
          editJobID,
          position,
          company,
          jobLocation,
          jobType,
          status,
          applyDate,
        })
      )
      return
    } else {
      dispatch(
        addJob({ position, company, jobLocation, jobType, status, applyDate })
      )
      return
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`name: ${name} value: ${value}`)
    dispatch(changeJobInput({ name, value }))
  }

  const handleClear = () => {
    dispatch(clearValues())
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEdit ? 'Edit Job' : 'Add Job'}</h3>
        <div className="form-center">
          {/* position text */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          {/* company text */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          {/* jobType select */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            options={jobTypeOptions}
            handleChange={handleChange}
          />

          {/* jobLocation select */}
          <FormRowSelect
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            options={jobLocationOptions}
            handleChange={handleChange}
          />
          <FormRow
            type="date"
            name="applyDate"
            labelText="apply date"
            value={applyDate}
            handleChange={handleChange}
          />
          {/* jobType select */}
          <FormRowSelect
            name="status"
            value={status}
            options={statusOptions}
            handleChange={handleChange}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClear}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
