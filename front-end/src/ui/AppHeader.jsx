import React from 'react'
<<<<<<< HEAD
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthUserContext from '../contexts/AuthUserContext'
import myfetch from '../lib/myfetch'
import MenuItem from './MenuItem'

export default function AppHeader() {
  const { authUser, setAuthUser } = React.useContext(AuthUserContext)
  const navigate = useNavigate()
  const location = useLocation()

  // useEffect() que será executado toda vez que a rota do
  // front-end (location) for alterada perguntando ao 
  // back-end qual é o usuário autenticado e guardando 
  // essa informação em authUser
  React.useEffect(() => {
    (async function() {
      try {
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      }
      catch(error) {
        console.error(error)
        setAuthUser(null)
        // Redirecionar para a página de login
        // navigate('/login')
      }
    })()
  }, [location])

  async function handleLogoutClick() {
    if(confirm('Deseja realmente sair?')) {
      try {
        await myfetch.post('/users/logout')
        navigate('/login')  
      } catch (error) {
        console.error(error);
        alert('ERRO DO SERVIDOR: ' + error.message)
      }
      
    }
  }

  function AuthControl() {
    if(authUser) return (
      <li style={{ marginLeft: '36px' }}>
        <span>{authUser.username}</span>&nbsp;
        (<a href="#" onClick={handleLogoutClick}>Sair</a>)
      </li>
    )
    else return (
      <li style={{ marginRight: '12px' }}>
        <Link to="/login">ENTRAR</Link>
      </li>
    )
  }

=======
import { Link } from 'react-router-dom'

export default function AppHeader() {
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
  return (
    <>
      <h1>Segurança no Desenvolvimento de Aplicações</h1>
      <hr />
      <ol style={{ listStyleType: 'none', display: 'flex' }}>
<<<<<<< HEAD
        <MenuItem dest={"/"} children={"Página Inicial"}/>
        <MenuItem dest={"/users"} userLevel={2} children={"Usuários"}/>
        <MenuItem dest={"/brute-force"} userLevel={1} children={"Força Bruta"}/>
        <AuthControl />
=======
        <li style={{ marginRight: '12px' }}>
          <Link to="/">Página inicial</Link>
        </li>
        <li style={{ marginRight: '12px' }}>
          <Link to="/login">Entrar</Link>
        </li>
        <li style={{ marginRight: '12px' }}>
          <Link to="/users">Usuários</Link>
        </li>
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
      </ol>
    </>
  )
}