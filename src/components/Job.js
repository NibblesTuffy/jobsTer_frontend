import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Job'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, setEdit } from '../features/job/jobSlice'
import JobInfo from './JobInfo'
import moment from 'moment/moment'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  applyDate,
}) => {
  const date = moment(applyDate).format('MMM Do YY')
  const dispatch = useDispatch()
  // const { isEdit } = useSelector((store) => store.jobs)
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                console.log('edit')
                applyDate = new Date(applyDate).toISOString().split('T')[0]
                dispatch(
                  setEdit({
                    _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    createdAt,
                    status,
                    applyDate,
                  })
                )
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                console.log(`delete front end ${_id}`)
                dispatch(deleteJob(_id))
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
