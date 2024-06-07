import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'
<<<<<<< HEAD
import AuthUserContext from './contexts/AuthUserContext'
import React from 'react'

function App() {
  
  const [authUser, setAuthUser] = React.useState(null)
  

  
  
  return (
    <>
      <BrowserRouter>
        <AuthUserContext.Provider value={{authUser, setAuthUser}}>
          <AppHeader />
          <hr />
          <AppRoutes />
        </AuthUserContext.Provider>
=======

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <hr />
        <AppRoutes />
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
      </BrowserRouter>
    </>
  )
}

export default App
