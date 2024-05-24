import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import myfetch from "../lib/myfetch";
import "./UserForm.css";
import User from "../models/User";
import { ZodError } from 'zod';

export default function UserForm() {
  const [state, setState] = React.useState({
    user: {},
    inputErrors: null
  });
  const { user, inputErrors } = state;

  const editPasswordRef = React.useRef();

  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    if (params.id) fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await myfetch.get(`/users/${params.id}`);
      setState({ ...state, user: result });
    } catch (error) {
      alert("Erro:" + error.message);
    }
  }

  function handleFieldChange(e) {
    const userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleEditPasswordToggle(e) {
    if (e.target.checked) editPasswordRef.current.style.visibility = "visible";
    else editPasswordRef.current.visibility = "hidden";
  }

  function handleIsAdminClick(e) {
    const userCopy = { ...user };
    userCopy.is_admin = e.target.checkedset;
    setState({ ...state, user: userCopy });
  }

  async function handleSubmit (event) {
    event.preventDefault()  // Impede o recarregamento da página
    try {
      // Invoca a validação do Zod por meio do model User
      User.parse(user)

      // Se a rota tiver o parâmetro id, siginifica que estamos editando um usuário
      if(params.id) await myfetch.put(`/users/${params.id}`, user)

      // Senão, estaremos criando um novo usuário
      else await myfetch.post('/users', user)
    }
    catch(error) {
      console.error(error)

      // Verifica se há erros de validação do Zod
      if(error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e os colocamos na variável de estado
        // inputErrors
        const messages = {}
        for (let i of error.issues) [i.path[0]] = i.message
        setState({ ...state, inputErrors: messages })
        alert('Há campos com valores inválidos no formulário. Verifique.')
      }
      else alert(error.message)
    }
  }

  return (
    <>
      <h1>{params.id ? `Editando usuário #${params.id}` : "Novo usuário"}</h1>
      <form>
        <div>
          <label>
            <span>Nome completo:</span>
            <input
              name="fullname"
              value={user.fullname}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Nome de usuário</span>
            <input
              name="username"
              value={user.username}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div>
          <input type="checkbox" onClick={handleEditPasswordToggle} />
          &nbsp;<span>Alterar Senha</span>
        </div>
        <div ref={editPasswordRef} className="editPassword">
          <label>
            <span>Digite a senha:</span>
            <input
              name="password"
              type="password"
              value={user.password2}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={user.is_admin}
            onClick={handleIsAdminClick}
          />
          &nbsp;<span>Usuário é administrador</span>
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </>
  );
}
