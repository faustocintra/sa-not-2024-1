import React from 'react'
import myfetch from '../lib/myfetch'
<<<<<<< HEAD
import './UserList.css'
import { Link } from 'react-router-dom'
=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

export default function UserList() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await myfetch.get('/users')
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

<<<<<<< HEAD
      <p><Link to="/users/new">[Criar novo usuário]</Link></p>

      <table>
        <tr>
=======
      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <tr style={{ border: '1px solid black' }}>
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
          <th>Cód.</th>
          <th>Nome completo</th>
          <th>Nome de usuário</th>
          <th>É admin?</th>
<<<<<<< HEAD
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
=======
        </tr>
        {
          users.map(u => (
            <tr style={{ border: '1px solid black' }}>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.username}</td>
              <td>{u.is_admin ? 'Sim' : 'Não'}</td>
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
            </tr>
          ))
        }
      </table>
    </>
  )
}