import React from 'react'
import AuthUserContext from '../contexts/AuthUserContext'


export default function AuthGuard({ userLevel = 0, children }) {

    const { authUser } = React.useContext(AuthUserContext)

    if ((userLevel === 0) ||
        (userLevel === 1 && authUser) ||
        (userLevel === 2 && authUser?.is_admin)) {
        return children
    } else return (
        <>
            <h1>Não Autorizado</h1>
            <p>Você não tem autorização para acessar esta rota</p>
        </>

    )
}

    /* 
        👆👆
        Vulnerabilidade: API5:2023 – Falha de autenticação a nível de função. P
        Esta vulnerabilidade foi evitada nesta função AuthGuard
        Nessas linhas evitamos que o atacante ou até mesmo outro usuário, tenha acesso a dados que 
        não deveriam.
        Verificando o nivel da cada usuário, conseguimos previnir que um usuário comum acesse 
        a rotas que apenas usuários administradores deviam ter acesso
    */