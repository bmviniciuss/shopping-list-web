import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom'
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen'
import { useAuth } from '../context/auth'
import { DashboardCategories } from '../views/dashboard/categories/DashboardCategories'
import { DashboardHome } from '../views/dashboard/home/DashboardHome'
import { LoginView } from '../views/login/LoginView'
import { PrivateOutlet } from './PrivateOutlet'
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
        <Route path="/login" element={<LoginView />} />
        <Route path="/dashboard" element={<PrivateOutlet />}>
          <Route index element={<DashboardHome />}/>
          <Route path="categorias" element={<DashboardCategories />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
