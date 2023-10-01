import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobsStats } from '../../features/allJobs/allJobsSlice'
import { ChartsContainer, StatsContainer, Loading } from '../../components'

const Stats = () => {
  const dispatch = useDispatch()
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  useEffect(() => {
    dispatch(getJobsStats())
  }, [])


  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
