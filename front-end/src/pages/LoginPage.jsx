import React from 'react'
import myfetch from '../lib/myfetch'
import { useNavigate } from 'react-router-dom'
import {zodError} from 'zod'
import Login from '../models/Login'

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [inputErrors, setInputErrors] = React.useState(null)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()    // Evita o recarregamento da tela
    try {

      // Invoca a validação do model Login
      Login.parse({username, password})


      // Em aplicações de produção, aqui deveria ser mostrado
      // algum feedback de espera para o usuário
      //const result = await myfetch.post('/users/login', { username, password })
      await myfetch.post('/users/login', { username, password })

      // Armazen a o token recebido no localStorage
      // ATENÇÃO: ABORDAGEM NÃO SEGURA, há outros meios
      // mais adequados de armazenar o token com segurança
      // window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, result.token)

      // Deu certo, vamos navegar para a página inicial
      navigate('/')
    }
    catch(error) {
      // Deu errado, permanecemos na página de login e 
      // informamos o usuárioalert('Usuário ou senha inválidos.')
      console.error(error)

      if(error instanceof zodError) {
        // Formamos um objeto contendo os erros do Zod e os colocamos 
        // na variável de estado inputErrors
        const messsages = {}
        for (let i of error.issues) messages[i.path[0]] = i.message
        setInputErrors(messsages)
        alert('Há campos com valores inválidos no formulário. Verifique.')
      }
      if(error.status === 400) alert(error.message)
      else alert('Usuario ou senha inválidos')
    }
  }

  return(
    <>
      <h1>Autentique-se</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>
            <span>Usuário:</span><br />
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <div className="input-errors">
              { inputErrors?.username }
            </div>
          </label>
        </div>

        <div>
          <label>
            <span>Senha:</span><br />
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
            <div className="input-errors">
              { inputErrors?.password }
            </div>
          </label>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>

      </form>
    </>
  )
}