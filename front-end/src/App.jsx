import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'
import AuthUserContext from './contexts/AuthUserContext'
import myfetch from './lib/myfetch'

function App() {

  const [authUser, setAuthUser] = React.useState(null)

  React.useEffect(() => {
    (async function () {
      try {
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      }
      catch (error) {
        console.log(error)
        setAuthUser(null)
      }
    })()
  },[])

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
