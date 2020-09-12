import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    let component, mockHandler, blog;

    beforeEach(() => {
        blog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }

        mockHandler = jest.fn()
        component = render(
            <BlogForm handleBlogCreate={mockHandler} />
        )
    })

    test('should call handler with right details on creating blog', () => {
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('.blogForm')

        fireEvent.change(title, {
            target: { value: blog.title }
        })

        fireEvent.change(author, {
            target: { value: blog.author }
        })

        fireEvent.change(url, {
            target: { value: blog.url }
        })

        fireEvent.submit(form)

        expect(mockHandler).toHaveBeenCalledWith(blog)
    })


})


