import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser, FaFileUpload} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()  
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)  
  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
    {/*Makes Header Background Blue (Bootstrap)*/}
    <div className='bg-info'>
      <header className='header'>

            <div className='logo'>
                <Link to='/'>
                  InstruRent
                </Link>
            </div>

            <ul>
                {user ? (
                  <>
                    <li>
                        <Link to='/upload'>
                          <FaFileUpload />Upload
                        </Link>
                    </li>  
                    <li>
                        <button className='btn' onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                    </li>
                  </ >
                ) : (
                  <>
                    <li>
                      <Link to='/login'>
                        <FaSignInAlt /> Login
                      </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                          <FaUser /> Register
                        </Link>
                    </li>
                  </>)}
              
            </ul>

      </header>
    </div>
    </>
  )
}

export default Header