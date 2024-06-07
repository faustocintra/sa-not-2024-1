import React from 'react'
import myfetch from '../lib/myfetch'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import { ZodError } from 'zod'
import Login from '../models/Login'

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
<<<<<<< HEAD
  const [inputErrors, setInputErrors] = React.useState(null)
=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()    // Evita o recarregamento da tela
    try {
<<<<<<< HEAD

      // Invoca a validação do model Login
      Login.parse({ username, password })

      // Em aplicações de produção, aqui deveria ser mostrado
      // algum feedback de espera para o usuário
      //const result = await myfetch.post('/users/login', { username, password })
      await myfetch.post('/users/login', { username, password })
=======
      // Em aplicações de produção, aqui deveria ser mostrado
      // algum feedback de espera para o usuário
      const result = await myfetch.post('/users/login', { username, password })
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

      // Armazena o token recebido no localStorage
      // ATENÇÃO: ABORDAGEM NÃO SEGURA, há outros meios
      // mais adequados de armazenar o token com segurança
<<<<<<< HEAD
      // window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, result.token)
=======
      window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, result.token)
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

      // Deu certo, vamos navegar para a página inicial
      navigate('/')
    }
    catch(error) {
      // Deu errado, permanecemos na página de login e 
      // informamos o usuário
<<<<<<< HEAD
      console.error(error)

      if(error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e os colocamos
        // na variável de estado inputErrors
        const messages = {}
        for(let i of error.issues) messages[i.path[0]] = i.message
        setInputErrors(messages)
        alert('Há campos com valores inválidos no formulário. Verifique.')
      }
      else if(error.status === 400) alert(error.message)
      else alert('Usuário ou senha inválidos.')
=======
      alert('Usuário ou senha inválidos.')
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
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
<<<<<<< HEAD
            <div className="input-error">
              { inputErrors?.username }
            </div>
=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
          </label>
        </div>

        <div>
          <label>
            <span>Senha:</span><br />
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
<<<<<<< HEAD
            <div className="input-error">
              { inputErrors?.password }
            </div>
=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
          </label>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>

      </form>
    </>
  )
}