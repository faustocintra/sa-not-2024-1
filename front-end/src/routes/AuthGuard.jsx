import React from 'react';
import AuthUserContext from '../context/AuthUserContext';

export default function AuthGuard({ userLevel=0, children }) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */

  const { authUser } = React.useContext(AuthUserContext);

  /*
    Vulnerabilidade - API5:2023 – Falha de autenticação a nível de função

    Está vulnerabilidade foi evitada ao verificar o nível de permissão do usuário nessa tela.
    Assim, evitando que usuários não autorizados ou sem logins tenham acesso a recursos que não deveriam.
    Por exemplo: Se a tela ter userLevel igual a 2. Será verificado se o usuário é administrador para
    poder utiliza-la, se não, irá aparecer que ele não tem permissão de acesso.
  */
  if ((userLevel === 0) || (userLevel === 1 && authUser) || (userLevel === 2 && authUser?.is_admin)) {
    return children;
  } else {
    return (
      <>
        <h1>Não autorizado</h1>
        <p>Você não tem permissão para acessar este recurso.</p>
      </>
    );
  }
}