import React from 'react'
import AuthUserContext from '../contexts/AuthUserContext'

export default function AuthGuard({ userLevel = 0, children}) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */
  
  const { authUser } = React.useContext(AuthUserContext)
  /*
  Vulnerabilidade: API5:2023 – Foi evitada o acesso aos recursos, ao
  verificar os diferentes níveis de autorização, usuário e administrador.
  */

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

/*
Entendo que o código foi projetado para controlar o acesso a aplicação
com base nos níveis de autenticação e autorização.
Ao ser utilizado o AuthUserContext é permitido verificar se o usuário tem
privilégios de administrador, assim somente usuários autorizados podem acessar
determinadas áreas da aplcação.
*/