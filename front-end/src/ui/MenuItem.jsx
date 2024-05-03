import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "../contexts/AuthUserContext";

export default function MenuItem({ userLevel = 0, dest}) {
    const authUser = React.useContext((AuthUserContext))

    if(userLevel === 0 || (userLevel == 1 && authUser) || (userLevel === 3 && authUser.is_admin)){
        return (
            <li key={dest} style={{marginRight: '12px'}}>
            <Link to="/login">ENTRAR</Link>
            </li>
            
        )
    }
    else return <></>

}

