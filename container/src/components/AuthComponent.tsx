import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginUser, registerUser, logoutUser } from '../store/thunks/authThunks'
import { clearError } from '../store/slices/authSlice'
import {
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from '../store/selectors/authSelectors'

const AuthComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isRegisterMode) {
      await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      )
    } else {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        }),
      )
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    setFormData({ email: '', password: '', name: '' })
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>
  }

  if (isAuthenticated && user) {
    return (
      <div
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          margin: '10px',
          borderRadius: '5px',
        }}
      >
        <h3>Welcome, {user.name}!</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <button
          onClick={handleLogout}
          style={{ padding: '10px', margin: '5px' }}
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        margin: '10px',
        borderRadius: '5px',
      }}
    >
      <h3>{isRegisterMode ? 'Register' : 'Login'}</h3>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
          <button onClick={handleClearError} style={{ marginLeft: '10px' }}>
            Clear
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegisterMode && (
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                padding: '8px',
                width: '200px',
                display: 'block',
                marginBottom: '5px',
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              padding: '8px',
              width: '200px',
              display: 'block',
              marginBottom: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{
              padding: '8px',
              width: '200px',
              display: 'block',
              marginBottom: '5px',
            }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', margin: '5px' }}>
          {isRegisterMode ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          style={{ padding: '10px', margin: '5px' }}
        >
          Switch to {isRegisterMode ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default AuthComponent
