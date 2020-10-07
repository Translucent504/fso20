import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setToken, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        },
        update: (store, response) => {
            localStorage.setItem('library-user-token', response.data.login.value)
            console.log(response.data.login.value)
        },
        refetchQueries: [{query:ME}]

    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            setPage('books')
        }
    }, [result.data]) // eslint-disable-line


    if (!show) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({
            variables: {
                username,
                password
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input onChange={({ target: { value } }) => setUsername(value)} value={username} type="text" id="username" />
                <label htmlFor="password">Password</label>
                <input onChange={({ target: { value } }) => setPassword(value)} value={password} type="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
