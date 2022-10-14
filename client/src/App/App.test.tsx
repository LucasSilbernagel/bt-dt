import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo/client'

describe('App', () => {
  test('renders', () => {
    render(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    )
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByText('Switch to dark theme')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('theme-toggle'))
    expect(screen.getByText('Switch to light theme')).toBeInTheDocument()
    expect(screen.getByText('Been there, done that!')).toBeInTheDocument()
    expect(screen.getByTestId('search-autocomplete')).toBeInTheDocument()
    expect(screen.getByTestId('city-map-container')).toBeInTheDocument()
    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Attractions')).toBeInTheDocument()
    expect(screen.getByTestId('all-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('some-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('none-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('not-visited-icon')).toBeInTheDocument()
    expect(screen.getByTestId('github-link')).toBeInTheDocument()
    expect(screen.getByText('Built by')).toBeInTheDocument()
    expect(screen.getByText('Lucas Silbernagel')).toBeInTheDocument()
  })
})
