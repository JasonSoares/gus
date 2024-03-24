import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import RootLayout from '../../layouts/RootLayout'

describe('<RootLayout />', () => {
  const setup = () => render(
    <MemoryRouter initialEntries={[`/`]} >
      <Routes>
        <Route path="/" element={<RootLayout />} />
      </Routes>
    </MemoryRouter>
  )

  it('renders the layout', () => {
    const { getByRole } = setup()
    const layoutElement = getByRole('main')
    expect(layoutElement).toBeInTheDocument()
  })

  it('renders the header', () => {
    const { getByRole } = setup()
    const headerElement = getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })
})
