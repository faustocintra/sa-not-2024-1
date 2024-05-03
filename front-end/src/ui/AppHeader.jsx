import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthUserContext from '../contexts/AuthUserContext'
import myfetch from '../lib/myfetch'
import MenuItem from './MenuItem'


export default function AppHeader() {
  const {authUser} = React.useContext(AuthUserContext)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    (async function() {
      try{
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      }
      catch(error) {
        console.error(error)
        setAuthUser(null)
        
      }
    })()
  }, [location])


  function handleLogoutClick(){
    if(confirm('Deseja realmente sair?')){
      window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
      navigate('/login')
    }

  }

  function AuthControl() {
    if (authUser) return (
      <li style={{marginLeft: '36px'}}>
        <span>{authUser.username}</span>&ncs;
        (<a href='#' onClick={{handleLogoutClick}}>Sair</a>)
      </li>
    )
    else return (
      <li style={{marginRight: '12px'}}>
        <Link to="/login">ENTRAR</Link>
      </li>
    )
    
  }

  return (
    <>
      <h1>Segurança no Desenvolvimento de Aplicações</h1>
      <hr />
      <ol style={{ listStyleType: 'none', display: 'flex' }}>
        <MenuItem dest="/">Pagina Inicial</MenuItem>
        <MenuItem userLevel={2} dest="/users">Usuários</MenuItem>
        <AuthControl key="#" />
      </ol>
    </>
  )
}