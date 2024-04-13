import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logoutUser, selectUser } from '../app/slices/userSlice'
import type { AppDispatch } from '../app/store'
import './Header.css'

function Header() {
  const user = useAppSelector(selectUser)
  const dispatch: AppDispatch = useAppDispatch()

  const logoutHandler = async () => {
    dispatch(logoutUser())
  }

  return (
    <div className='header_container'>
      <div>
        <p>User email: {user?.email}</p>
        <p>User name: {user?.name}</p>
      </div>

      <div className='logout_container' onClick={logoutHandler}>
        Logout
      </div>
    </div>
  )
}

export default Header
