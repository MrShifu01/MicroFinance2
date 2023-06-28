import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { darkMode, lightMode } from '../redux/modeSlice'
import { resetUser } from '../redux/userSlice'
import axios from 'axios'


const Header = () => {
  const page = useSelector((state) => state.page.page)
  const user = useSelector((state) => state.user.data)
  const mode = useSelector((state) => state.mode.mode)

  const dispatch = useDispatch()

  const handleLogout = async () => {
    await axios.post('/users/logout')
    dispatch(resetUser())
  }

  return (
    <div>
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className='text-white text-4xl my-4'>LMG</h1>
            </Link>
          </div>
          <ul className="text-white flex gap-3">
            
            <li className={page === 'admin' ? "text-black" : ''}>
              {user && user.isAdmin && (
                <Link to="/admin">Admin</Link>
              )}
              {!user && (
                <span className="disabled-link"></span>
              )}
            </li>
            <li>
              <Link to='/' className='cursor-pointer' onClick={handleLogout}>Logout</Link>
            </li>

            <li>

              {mode === 'light' && <svg onClick={() => dispatch(darkMode())} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>}
              
              {mode === 'dark' && <svg onClick={() => dispatch(lightMode())} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>}

            </li>

          </ul>
        </nav>
    </div>
  )
}

export default Header