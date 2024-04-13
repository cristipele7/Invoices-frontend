import { useEffect, useState } from 'react'
import './Login.css'
import type { AppDispatch } from '../app/store'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchUser, selectErrorMessage, selectUser } from '../app/slices/userSlice'
import { Navigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [logging, setLogging] = useState(false)
  const user = useAppSelector(selectUser)
  const errorMessage = useAppSelector(selectErrorMessage)
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const newDisabled = email.length === 0 || password.length === 0
    setDisabled(newDisabled)
  }, [email, password])

  const changeEmailHandler = (newEmail: string) => {
    setEmail(newEmail)
  }

  const changePasswordHandler = (newPassword: string) => {
    setPassword(newPassword)
  }

  const loginHandler = async () => {
    setLogging(true)
    await dispatch(fetchUser({ email, password })).unwrap()
    setLogging(false)
  }

  if (user) {
    return <Navigate to={'/invoices'} />
  }

  return (
    <div className='login_container'>
      <h2>Login</h2>

      <input 
        type='email'
        placeholder='Email'
        value={email}
        onChange={(event) => changeEmailHandler(event.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(event) => changePasswordHandler(event.target.value)}
      />

      <button onClick={loginHandler} disabled={disabled} >
        {logging ? '...' : 'Login'}
      </button>

      <p className='erro_message'>{errorMessage ?? ""}</p>
    </div>
  )
}

export default Login
