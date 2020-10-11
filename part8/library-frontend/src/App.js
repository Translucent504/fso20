import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
    setPage('books')
  }
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const includesIn = (set, object) => {
    return set.map(item => item.id).includes(object.id)
  }
  
  const updateCacheWith = (item) => {
    const dataInStore = client.readQuery({query: ALL_BOOKS})
    if(!includesIn(dataInStore.allBooks, item)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(item)
        }
      })
    }
  }
  


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
        token={token}
      />



    </div>
  )
}

export default App