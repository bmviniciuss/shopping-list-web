import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom'
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen'
import { useAuth } from '../context/auth'
import { LoginView } from '../views/login/LoginView'
import { PrivateRoute } from './PrivateRoute'

function Main () {
  return (
    <div>
      Home
    </div>
  )
}

export function Router () {
  const auth = useAuth()

  if (auth.loading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        )} />
        <Route path="/login" element={<LoginView />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
