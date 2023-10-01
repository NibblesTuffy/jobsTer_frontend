import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'

import { FaTimes } from 'react-icons/fa'
import { toggleSidebar } from '../features/user/userSlice'

import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const toggleSmallSidebar = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSmallSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSmallSidebar={toggleSmallSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
