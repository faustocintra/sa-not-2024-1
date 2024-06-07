import React, { useContext } from "react";
import AuthUserContext from "../context/AuthUserContext";

/**
 * API1:2023 - Falha de autenticação a nível de objeto:
 * Erro foi corrigido na verificação do nivel de usuario que está acessando a rota, garantindo que um usuario comum não acesse rotas administrativas.
 * verificação feita em userLevel, que é passada para appRoutes onde proteje rotas sensiveis.
 */

// eslint-disable-next-line react/prop-types
export default function AuthGuard({ userLevel = 0, children }) {
    const { authUser } = useContext(AuthUserContext);

    if (userLevel === 0 ||
        (userLevel === 1 && authUser) ||
        (userLevel === 2 && authUser?.is_admin)) {
        return children
    } else {
        return (
            <>
                <h1>Não autorizado</h1>
                <p>Você não tem autorização para acessar este recurso.</p>
            </>
        )
    }
}