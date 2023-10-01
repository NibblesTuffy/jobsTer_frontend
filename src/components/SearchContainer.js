import React, { useMemo, useState } from 'react'
import { FormRow, FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilters, removeFilters } from '../features/allJobs/allJobsSlice'

const SearchContainer = () => {
  const dispatch = useDispatch()
  const {
    search,
    searchStatus,
    searchType,
    searchLocation,
    sort,
    sortOptions,
    isLoading,
    searchStartMonth,
    searchEndMonth,
  } = useSelector((store) => store.allJobs)
  const { jobLocationOptions, jobTypeOptions, statusOptions } = useSelector(
    (store) => store.job
  )
  const [localSearch, setLocalSearch] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`search... ${name} : ${value}`)
    dispatch(changeFilters({ name, value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(removeFilters())
  }
  const clearFilter = () => {
    dispatch(removeFilters())
  }

  let timeoutID
  const debounce = () => {
    return (e) => {
      setLocalSearch(e.target.value)
      console.log(localSearch)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(changeFilters({ name: e.target.name, value: e.target.value }))
        console.log({ search: localSearch })
      }, 1000)
      console.log(`timeoutID: ${timeoutID}`)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            name="searchType"
            labelText="job type"
            value={searchType}
            options={[...jobTypeOptions, 'all']}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="searchLocation"
            labelText="location"
            value={searchLocation}
            options={[...jobLocationOptions, 'all']}
            handleChange={handleChange}
          />

          {/* jobLocation select
          <FormRowSelect
            name="searchLocation"
            labelText="job location"
            value={searchLocation}
            options={[...jobLocationOptions, 'all']}
            handleChange={handleChange}
          /> */}

          <FormRow
            type="month"
            name="searchStartMonth"
            value={searchStartMonth}
            labelText="start at"
            handleChange={handleChange}
          />

          <FormRow
            type="month"
            name="searchEndMonth"
            labelText="end at"
            value={searchEndMonth}
            handleChange={handleChange}
          />
          {/* jobType select */}
          <FormRowSelect
            name="searchStatus"
            value={searchStatus}
            options={[...statusOptions, 'all']}
            handleChange={handleChange}
            labelText="status"
          />
          <FormRowSelect
            name="sort"
            value={sort}
            options={sortOptions}
            handleChange={handleChange}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={clearFilter}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
