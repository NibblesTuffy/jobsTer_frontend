import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import { toggleSidebar } from '../features/user/userSlice'
const NavLinks = ({ toggleSmallSidebar }) => {
  const dispatch = useDispatch()
  return (
    <div className="nav-links">
      {links.map(({ id, path, text, icon }) => {
        //   NavLink is similar to Link,
        //   but it has the ability to add
        //   additional styling attributes to
        //   the element.
        //   For example, you can use NavLink
        //   to style the active link differently
        //   than the other links.
        //   NavLink utilizes the "activeClassName"
        //   attribute.
        //   This is the class that will be applied
        //   to the element when it is active
        return (
          // className: {isActive: true, isPending: false}
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }}
            onClick={toggleSmallSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks