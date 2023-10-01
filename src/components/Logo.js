import React from 'react'
import jobpng from '../assets/images/job.png'
import logo from '../assets/images/logo.svg'
import { styled } from 'styled-components'

const Logo = () => {
  return (
    <Wrapper>
      {/* <img
        width="10%"
        height="10%"
        src={jobpng}
        alt="job tracker"
        className="logo"
      />

      <span className="job">JobTracker</span> */}
      <img src={logo} alt="job tracker" className="logo" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .job {
    display: inline;
    color: var(--primary-500);
    margin-left: 2%;
    font-size: 2rem;
    font-style: 'italic';
    font-weight: bold;
  }
`

export default Logo
