import React, { useState, useEffect } from 'react'
import LoginForm from '../components/Login/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUsingEmail } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import SwiperPhoto from '../components/Login/SwiperPhoto'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = () => {
    if (email.length === 0) {
      alert("Enter Valid Email")
    }
    else if (password.length === 0) {
      alert("Enter Valid Password")
    }
    else {
      dispatch(loginUsingEmail(email, password))
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])
  return (
    <div className='grid grid-flow-col grid-cols-2 bg-gray-300 items-center justify-center h-[100vh] ' >
      <div className='w-[100%]'>
        <SwiperPhoto />
      </div>
      <div className='w-[100%]'>
        <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
      </div>
    </div>
  )
}

export default Login