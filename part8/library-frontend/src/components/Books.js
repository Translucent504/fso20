import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }
  
  const genres = [...books?.reduce((prev, curr) => curr.genres.length ? new Set([...curr.genres, ...prev]) : prev, new Set())]
  const byGenre = (book) => {
    if (!genre) {
      return true
    }
    return book.genres.includes(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre ? genre : "all"}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(byGenre)
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <p>genres {genres.map(g => <button onClick={() => setGenre(genre => genre === g ? null : g)} key={g}>{g}</button>)}</p>
    </div>
  )
}

export default Books