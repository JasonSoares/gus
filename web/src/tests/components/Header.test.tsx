import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from '../../components/Header'
import { MemoryRouter, Routes, Route } from 'react-router'
import Stats from '../../routes/Stats'

describe('<Header />', () => {
  const setup = () => render(
    <MemoryRouter initialEntries={[`/`]} >
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </MemoryRouter>
  )

  it('renders the header', () => {
    const { getByRole } = setup()
    const headerElement = getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })

  it('renders the title', () => {
    const { getByText } = setup()
    const titleElement = getByText('GUS URL Shortener')
    expect(titleElement).toBeInTheDocument()
  })

  it('renders the navigation links', () => {
    const { getByRole } = setup()

    expect(getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Stats' })).toBeInTheDocument()
  })
})
