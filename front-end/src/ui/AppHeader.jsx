import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthUserContext from '../contexts/AuthUserContext'
import myfetch from '../lib/myfetch'
import MenuItem from './MenuItem'

export default function AppHeader() {
  const {authUserm, setAuthUser} = React.useContext(AuthUserContext)
  const navigate = useNavigate()
  const location = useLocation()

  // useEffect() que será executado toda vez que a rota do frontend (location) for alterada perguntando ao
  //backend qual é o usuário autentidade e guaradndo essa informação em authUser
  React.useEffect(() => {
    (async function() {
      try{
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      }
      catch(error){
        console.error(error)
        setAuthUser(null)
        // Redirecionar para a página do login
        // navigate('/login')
      }
    })
  }, [location])

  function handleLogoutClick() {
    if(confirm('Deseja realmente sair?')) {
      // Tira da memória as informações sobre o usuário autenticado
      setAuthUser(null)
      // Exclui o token do localStorage
      window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
      // Redireciona para a párina de login 
    }
  }

  function AuthControl() {
    if(authUser) return (
      <li style={{marginLeft: '36px'}}>
        <span>{authUser.username}</span>&nbsp;
        (<a href="#" onClick={handleLogoutClick}>Sair</a>)
      </li>
    )
    else return (
      <li style={{marginRight: '12px'}}>
        <Link to="/login">Entrar</Link>
      </li>
    )
  }

  return (
    <>
      <h1>Segurança no Desenvolvimento de Aplicações</h1>
      <hr />
      <ol style={{ listStyleType: 'none', display: 'flex' }}>
        <MenuItem dest="/">Página Inicial</MenuItem>
        <MenuItem userLevel={2} dest="/users">Usuários</MenuItem>
        <AuthControl/>
      </ol>
    </>
  )
}