import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'
import AuthUserContext from './context/AuthUserContext'
import { useState } from 'react'

function App() {
  const [authUser, setAuthUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <AuthUserContext.Provider value={{authUser, setAuthUser}}>
          <AppHeader />
          <hr />
          <AppRoutes />
        </AuthUserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
