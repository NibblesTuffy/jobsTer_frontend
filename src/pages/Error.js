import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import NoResult from '../assets/images/no-results.png'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={NoResult} alt="404 NOT FOUND" />
            <h3>404 Not Found /(ㄒoㄒ)/~~</h3>
            <p>Sorry, no results fround by your search...</p>
            <Link to='/register'>Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error