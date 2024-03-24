import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../../routes/Home.tsx'
import { createShortUrl } from '../../services/api.ts'

const setup = () => render(<App />)

vi.mock('../../services/api.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/api.ts')>()
  return {
    ...mod,
    createShortUrl: vi.fn().mockResolvedValue({ slug: 'abc123' })
  }
})

const mockCreateShortUrl = vi.mocked(createShortUrl)

describe('<Home />', () => {
  it('renders the form', () => {
    const { getByLabelText, getByRole } = setup()

    expect(getByLabelText('Enter a url')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Shorten' })).toBeInTheDocument()
  })

  describe('form submission', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    it('renders an alert when the url is invalid', async () => {
      const { getByLabelText, getByRole, findByText } = setup()

      await userEvent.type(getByLabelText('Enter a url'), 'www.example.com')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      const alertElement = await findByText('Please enter a valid URL starting with http:// or https://')
      expect(alertElement).toBeInTheDocument()

      userEvent.click(getByRole('button', { name: 'Close' }))

      await waitFor(() => {
        expect(alertElement).not.toBeInTheDocument()
      })
    })

    it('renders an alert when the url is already a short url', async () => {
      const { getByLabelText, getByRole, getByText, queryByText } = setup()

      await userEvent.type(getByLabelText('Enter a url'), 'http://localhost:3000/abc123')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      await waitFor(() => {
        expect(queryByText('Already a short URL')).toBeInTheDocument()
      })

      const alertElement = getByText('Already a short URL')
      const closeButton = getByRole('button', { name: 'Close' })

      userEvent.click(closeButton)

      await waitFor(() => {
        expect(alertElement).not.toBeInTheDocument()
      })

      expect(mockCreateShortUrl).not.toHaveBeenCalled()
    })

    it('renders a success alert when the short url is created', async () => {
      const { getByLabelText, getByRole, getByText } = setup()

      mockCreateShortUrl.mockReturnValue(
        Promise.resolve({
          data: {
            id: 42,
            slug: 'abc123',
            url: 'https://www.example.com',
            visit_count: 0
          }
        })
      )

      await userEvent.type(getByLabelText('Enter a url'), 'https://www.example.com')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      await waitFor(() => {
        expect(getByText('Shortened URL created!')).toBeInTheDocument()
      })

      expect(mockCreateShortUrl).toHaveBeenCalledWith('https://www.example.com')
    })

    it('renders an error alert when the short url cannot be created', async () => {
      const { getByLabelText, getByRole, getByText } = setup()

      mockCreateShortUrl.mockRejectedValue(new Error('Failed to create short URL'))

      await userEvent.type(getByLabelText('Enter a url'), 'https://www.example.com')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      await waitFor(() => {
        expect(getByText('Failed to shorten URL')).toBeInTheDocument()
      })

      expect(mockCreateShortUrl).toHaveBeenCalledWith('https://www.example.com')
    })

    it('allows the user to copy the short url to the clipboard', async () => {
      const { getByLabelText, getByRole, getByText } = setup()

      mockCreateShortUrl.mockReturnValue(
        Promise.resolve({
          data: {
            id: 42,
            slug: 'abc123',
            url: 'https://www.example.com',
            visit_count: 0
          }
        })
      )

      Object.assign(window.navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined)
        }
      })

      await userEvent.type(getByLabelText('Enter a url'), 'https://www.example.com')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      await waitFor(() => {
        expect(getByText('Shortened URL created!')).toBeInTheDocument()
      })

      userEvent.click(getByRole('button', { name: 'Copy' }))

      await waitFor(() => {
        expect(getByText('Copied to clipboard!')).toBeInTheDocument()
      })
    })

    it('renders an error if the short url cannot be copied to the clipboard', async () => {
      const { getByLabelText, getByRole, getByText } = setup()

      mockCreateShortUrl.mockReturnValue(
        Promise.resolve({
          data: {
            id: 42,
            slug: 'abc123',
            url: 'https://www.example.com',
            visit_count: 0
          }
        })
      )

      Object.assign(window.navigator, {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(undefined)
        }
      })

      await userEvent.type(getByLabelText('Enter a url'), 'https://www.example.com')
      userEvent.click(getByRole('button', { name: 'Shorten' }))

      await waitFor(() => {
        expect(getByText('Shortened URL created!')).toBeInTheDocument()
      })

      userEvent.click(getByRole('button', { name: 'Copy' }))

      await waitFor(() => {
        expect(getByText('Failed to copy to clipboard')).toBeInTheDocument()
      })
    })
  })
})
