import { useEffect, useState } from 'react';
import myfetch from '../lib/myfetch';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { ZodError } from 'zod';
import User from '../models/User';
import './UserForm.css'

export function UserForm() {
    const [inputErrors, setInputErrors] = useState(null)
    const [state, setState] = useState({
        user: {},
        inputErrors: null
    });

    const editPasswordRef = useRef()

    const { user } = state;
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) fetchData()
    }, [])

    async function fetchData() {
        try {
            const result = await myfetch.get(`/users/${params.id}`)
            setState({ ...state, user: result })
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleFielChange(e) {
        const userCopy = { ...user };
        userCopy[e.target.name] = e.target.value;
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function handleEditPasswordToggle(e) {
        if (e.target.checked) editPasswordRef.current.style.display = 'block'
        else editPasswordRef.current.style.display = 'none'

        const userCopy = { ...user }
        userCopy.changePassword = e.target.checked
        setState({ ...state, user: userCopy })
    }

    function handleIsAdminClick(e) {
        const userCopy = { ...user }
        userCopy.is_admin = e.target.checked;
        setState({ ...state, user: userCopy })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            User.parse(user)

            if (params.id) await myfetch.put(`/users/${params.id}`, user)
            else await myfetch.post('/users', user)
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                const messages = {}
                for (let i of error.issues) messages[i.path[0]] = i.message
                setState({ ...state, inputErrors: messages })
                alert('Há campos com valores inválidos no formulário. Verefique.')
            }
            else alert('Usuário ou senha inválidos.')
        }
    }

    return (
        <>
            <h1>{params.id ? `Editando usuário ${params.fullname}` : 'Novo usuário'}</h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">
                        <span>Nome completo:</span>
                        <input
                            type="text"
                            name='fullname'
                            value={user.fullname}
                            onChange={handleFielChange}
                        />
                        <div className="input-error">
                            {inputErrors?.fullname}
                        </div>
                    </label>
                </div>

                <div>
                    <label htmlFor="">
                        <span>Nome de usuário:</span>
                        <input
                            type="text"
                            name='username'
                            value={user.username}
                            onChange={handleFielChange}
                        />
                        <div className="input-error">
                            {inputErrors?.username}
                        </div>
                    </label>
                </div>

                <div>
                    <input type="checkbox" onClick={handleEditPasswordToggle} />
                    &nbsp; <span>Alterar senha</span>
                </div>

                <div ref={editPasswordRef} className='edit-password'>
                    <label htmlFor="">
                        <span>Digite a senha:</span>
                        <input
                            type="password"
                            name='password'
                            value={user.password}
                            onChange={handleFielChange}
                        />
                        <div className="input-error">
                            {inputErrors?.password}
                        </div>
                    </label>
                    <label htmlFor="">
                        <span>Repita a senha:</span>
                        <input
                            type="password"
                            name='password2'
                            value={user.password2}
                            onChange={handleFielChange}
                        />
                        <div className="input-error">
                            {inputErrors?.password2}
                        </div>
                    </label>
                </div>

                <div>
                    <input type="checkbox" onClick={handleIsAdminClick} checked={user.is_admin} />
                    &nbsp; <span>Usuário é administrador</span>
                </div>

                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </>
    )
}
