import React from 'react'
import AuthUserContext from '../contexts/AuthUserContext'

/*
Vulnerabilidade: API3:2023 - Falha de autenticação a nível de propriedade
Essa função abaixa auxilia garante que apenas usuários autorizados tenham acesso às informações apropriadas.
Ela faz isso por meio do context do user no frontend, onde seu estado é compartilhado pela aplicação inteira
Nas rotas da aplicação, ele encobre elas com sua propriedade userLevel.
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