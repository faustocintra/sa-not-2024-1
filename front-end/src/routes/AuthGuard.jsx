import React from "react";
import AuthUserContext from "../contexts/AuthUserContext";

export default function AuthGuard({ userLevel = 0, children}) {
    /*
    userlevel:
    0 ~> qualquer usuário autenticado (autenticado ou não)
    1 ~> somente usuários autenticados
    2 ~> somente administrador
    */
   const { authUser } = React.userContext(AuthUserContext)
   
   if((userLevel === 0) || 
    (userLevel == 1 && authUser) ||
    (userLevel ==2 && authUser.is_admin)) {
        return children
    }
    else return (
        <>
            <h1>Não autorizado</h1>
            <p>Você não tem autorização para acessar este recurso</p>
        </>
    )
}