import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'
import AuthUserContext from './contexts/AuthUserContext'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthUserContext>
          <AppHeader />
          <hr />
          <AppRoutes />
        </AuthUserContext>
      </BrowserRouter>
    </>
  )
}

export default App
