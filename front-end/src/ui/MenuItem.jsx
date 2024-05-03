import React from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "../context/AuthUserContext";

export default function MenuItem({ userLevel = 0, dest, children }) {

    const { authUser } = React.useContext(AuthUserContext)

    if (userLevel === 0 || (userLevel === 1 && authUser) || (userLevel === 2 && authUser?.is_admin)) {
        return (
            <li key={dest} style={{ marginRight: '12px' }}>
                <Link to={dest}>{children}</Link>
            </li>
        )
    } else return <></>
}