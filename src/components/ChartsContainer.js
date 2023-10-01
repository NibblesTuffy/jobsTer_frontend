import React, { useEffect } from 'react'

import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getJobsStats } from '../features/allJobs/allJobsSlice'
const ChartsContainer = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getJobsStats())
  // }, [dispatch])
  const { monthlyApplications } = useSelector((store) => store.allJobs)
  console.log(monthlyApplications)

  const months = monthlyApplications.map((item) => item.date)
  const counts = monthlyApplications.map((item) => item.count)
  console.log(`months... ${months.length}, counts... ${typeof counts}`)

  return (
    <Wrapper>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: months,
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: counts,
          },
        ]}
        width={800}
        height={400}
      />
    </Wrapper>
  )
}

export default ChartsContainer
