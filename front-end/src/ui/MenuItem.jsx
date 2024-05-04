import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthUserContext from "../context/AuthUserContext";


// eslint-disable-next-line react/prop-types
export default function MenuItem({ userlevel = 0, dest, children }) {
    const { authUser } = useContext(AuthUserContext);

    if ((userlevel === 0) ||
        (userlevel == 1 && authUser) ||
        (userlevel == 2 && authUser.is_admin)) {
        return (
            <li style={{ marginRight: '12px' }}>
                <Link to={dest}>{children}</Link>
            </li>
        )
    } else {
        return <></>
    }
}