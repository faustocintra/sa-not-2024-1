import React from 'react'
import AuthUserContext from '../contexts/AuthUserContext'

/*
  Vulnerabilidade: API5:2023 – Falha de autenticação a nível de função
  Foi evitada ao implementar um AuthGuard,
  que verifica se o usuário tem o nível de acesso necessário para ter o acesso aos recursos protegidos.
*/
export default function AuthGuard({ userLevel = 0, children}) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */
  
  const { authUser } = React.useContext(AuthUserContext)

  if((userLevel === 0) || 
     (userLevel === 1 && authUser) ||
     (userLevel === 2 && authUser?.is_admin)
  ) return children
  
  else return (
    <>
      <h1>Não autorizado</h1>
      <p>Você não tem permissão para acessar este recurso.</p>
    </>
  )
}