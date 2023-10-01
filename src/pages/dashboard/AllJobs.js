import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import JobsContainer from '../../components/JobsContainer.js'
import SearchContainer from '../../components/SearchContainer'

const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJobs
