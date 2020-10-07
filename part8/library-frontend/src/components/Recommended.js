import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(()=> {
      if (user.data){
          setGenre(user.data.me.favoriteGenre)
      }
  }, [user.data])


  if (!props.show) {
    return null
  }

  const byGenre = (book) => {
    return book.genres.includes(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
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
    </div>
  )
}

export default Recommended