import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom'
import { LoginView } from '../views/login/LoginView'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
