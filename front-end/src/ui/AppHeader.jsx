import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader(){
    return (
        <>
            <h1> Segurança no Desenvolvimento de Aplicações</h1>
            <hr/>
            <ol style={{listStyle: 'none', display:'flex'}}>
                <li style={{marginRight:'12px'}}>
                    <Link to='/'> Pagina inicial</Link>
                </li>
                <li style={{marginRight:'12px'}}>
                    <Link to='/login'> Entrar</Link>
                </li>
            </ol>
        </>
    )
}