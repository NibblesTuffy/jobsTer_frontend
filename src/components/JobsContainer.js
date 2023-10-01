import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
import PageButtonContainer from './PageButtonContainer'

// import { getAllJobs } from '../features/allJobs/allJobsSlice'

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
    searchStartMonth,
    searchEndMonth,
    searchLocation,
  } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllJobs())
  }, [
    dispatch,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    searchStartMonth,
    searchEndMonth,
    searchLocation,
  ])

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    )
  }

  if (jobs.length === 0) {
    return <Wrapper>No job to display...┑(￣Д ￣)┍</Wrapper>
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  )
}

export default JobsContainer
