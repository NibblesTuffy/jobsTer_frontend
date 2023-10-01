import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, logoutUser, toggleSidebar } from '../features/user/userSlice'

const Navbar = () => {
  const { user } = useSelector((store) => store.user)
  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useDispatch()
//   console.log(`nav user ${user}`);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => {
            dispatch(toggleSidebar())
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        {/* dropdown button */}
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowDropdown(!showDropdown)
            }}
          >
            <FaUserCircle />
            
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearUser('Logout successfully! 😀'))
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
