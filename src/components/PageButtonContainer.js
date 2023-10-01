import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
  changePage,
  toNextPage,
  toPrevPage,
} from '../features/allJobs/allJobsSlice'
const PageButtonContainer = () => {
  const prevPage = () => {
    dispatch(toPrevPage())
  }
  const nextPage = () => {
    dispatch(toNextPage())
  }
  const dispatch = useDispatch()
  const { numOfPages, page } = useSelector((store) => store.allJobs)
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)
  console.log(pages)
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((n) => {
          return (
            <button
              className={n === page ? 'pageBtn active' : 'pageBtn'}
              type="button"
              key={n}
              onClick={() => {
                dispatch(changePage(n))
                console.log(`change page to page${n}`)
              }}
            >
              {n}
            </button>
          )
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageButtonContainer
