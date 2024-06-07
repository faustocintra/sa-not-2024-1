import React from "react";
import AuthUserContext from "../contexts/AuthUserContext";

export default function AuthGuard ({userLevel, children}){

    const {authUser}= React.useContext(AuthUserContext)


    /* 
        Vulnerabilidade: API5:2023 - Autorização de Nível de Função Quebrada
        No código abaixo, a partir do nível do usuário e pela validação do 
        authUser para verificar se o mesmo é admnistrador, é evitado tal 
        vulnerabilidade, evitando exibir a lista de usuários ou rotas
        confidenciais à pessoas não autorizadas.
    */
    if((userLevel ===0) ||
        (userLevel ===1 && authUser) ||
        (userLevel ===2 && authUser?.is_admin)
    ) return children
    else return(
        <>
            <h1>Não autorizado</h1>
            <p>Você não tem autorização para acessar este recurso</p>
        </>
    )

}