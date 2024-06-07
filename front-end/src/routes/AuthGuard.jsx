import React from 'react';
import AuthUserContext from '../contexts/AuthUserContext';

export default function AuthGuard({ userLevel = 0, children }) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */

  const { authUser } = React.useContext(AuthUserContext);

  /*
  API3:2023 – Falha de autenticação a nível de propriedade
  Deixar a função de validar o nível de acesso do usuário
  apenas no front-end é uma falha grave de segurança
  pois o usuário pode burlar e ter acesso a dados sensíveis
  para corrigir deve-se retornar do back-end um status-code 
  que auxilie o front a saber se o usuário tem permissão
  */

  if (
    userLevel === 0 ||
    (userLevel === 1 && authUser) ||
    (userLevel === 2 && authUser?.is_admin)
  )
    return children;
  else
    return (
      <>
        <h1>Não autorizado</h1>
        <p>Você não tem permissão para acessar este recurso.</p>
      </>
    );
}
