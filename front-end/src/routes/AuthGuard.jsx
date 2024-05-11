import React from "react";
import AuthUserContext from "../contexts/AuthUserContext";

export default function AuthGuard ({userLevel, children}) {
    /*
    userLevel
    0 ~> qualquer usuario autenticado ou não
    1 ~> somente usuarios autenticados
    2 ~> somente usuarios administradores
    */
   const {authUser} = React.useContext(AuthUserContext)

   if((userLevel === 0) || (userLevel === 1 && authUser) || (userLevel === 2 && authUser? is.admin))
    return children

   else return(
    <>
    <h1>Não Autorizado</h1>
    <p>Você não tem permissão para acessar este recurso</p>
    </>
   )
}