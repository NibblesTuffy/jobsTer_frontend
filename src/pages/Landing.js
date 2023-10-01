import devpng from '../assets/images/software-development.png'
import styled from 'styled-components'
import { Logo } from '../components'
import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracker</span> App
          </h1>
          <p>This is a job application track app...</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>

        <img src={devpng} alt="developer" className="img main-img" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }

  p {
    color: var(--grey-600);
  }

  .main-img {
    display: none;
  }
  //for smaller screen, do not display main image
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      grid-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing
