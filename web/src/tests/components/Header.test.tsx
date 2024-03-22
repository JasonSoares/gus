import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from '../../components/Header'

describe('<Header />', () => {
  it('renders the header', () => {
    const { getByRole } = render(<Header />)
    const headerElement = getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })

  it('renders the title', () => {
    const { getByText } = render(<Header />)
    const titleElement = getByText('GUS URL Shortener')
    expect(titleElement).toBeInTheDocument()
  })
})
