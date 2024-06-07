import React from 'react'
import myfetch from '../lib/myfetch'
import './UserList.css'
import { Link } from 'react-router-dom'

export default function UserList() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await myfetch.get('/users')
      /*
      Vulnerabilidade: API3:2023 – Falha de autenticação a nível de propriedade
      Recupera e trata somente das informações necessárias do backend para evitar a exposição de informações sensíveis, pois estamos atualizando o estado de uma variável de acordo com os dados enviados do backend ao fazer setUsers(result).
      */
      setUsers(result)
    }
    catch(error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <>
      <h1>Listagem de usuários</h1>

      <p><Link to="/users/new">[Criar novo usuário]</Link></p>

      <table>
        <tr>
          <th>Cód.</th>
          <th>Nome completo</th>
          <th>Nome de usuário</th>
          <th>É admin?</th>
          <th>Editar</th>
        </tr>
        {
          users.map(u => (
            <tr>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.username}</td>
              <td>{u.is_admin ? 'Sim' : ''}</td>
              <td><Link to={`./${u.id}`}>[Editar]</Link></td>
            </tr>
          ))
        }
      </table>
    </>
  )
}