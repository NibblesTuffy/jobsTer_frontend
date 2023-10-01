import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import { useSelector } from 'react-redux'
import Logo from './Logo'

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container show-sidebar'
            : ' sidebar-container'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          {/*without send toggleSmallSidebar={toggleSmallSidebar}, 
          so eachtime when click on the Navlink on Bigsidebar, 
          the function would not be invoked and the Bigsidebar is still on the page*/}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
