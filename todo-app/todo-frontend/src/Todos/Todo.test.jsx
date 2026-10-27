
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Todo from './Todo'

afterEach(() => {
  cleanup()
})

describe('Todo component', () => {
  it('renders a todo that is not done', () => {
    const todo = {
      _id: '1',
      text: 'Learn Docker',
      done: false
    }

    render(
      <Todo
        todo={todo}
        deleteTodo={vi.fn()}
        completeTodo={vi.fn()}
      />
    )

    expect(screen.getByText('Learn Docker')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Set as done' })).toBeInTheDocument()
  })

  it('renders a todo that is done', () => {
    const todo = {
      _id: '2',
      text: 'Finish exercise',
      done: true
    }

    render(
      <Todo
        todo={todo}
        deleteTodo={vi.fn()}
        completeTodo={vi.fn()}
      />
    )

    expect(screen.getByText('Finish exercise')).toBeInTheDocument()
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Set as done' })).not.toBeInTheDocument()
  })
})
