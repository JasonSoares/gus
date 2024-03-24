import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { createVisit } from '../../services/api'
import Visit from '../../routes/Visit'

const setup = (slug: string) => {
  return render(
    <MemoryRouter initialEntries={[`/${slug}`]}>
      <Routes>
        <Route path="/:slug" element={<Visit />} />
      </Routes>
    </MemoryRouter>
  )
}

vi.mock('../../services/api.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/api.ts')>()
  return {
    ...mod,
    createVisit: vi.fn()
  }
})

const mockCreateVisit = vi.mocked(createVisit)

describe('<Visit />', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders an error when the slug is blank', () => {
    const {getByText } = setup(' ')

      const errorElement = getByText('Error creating visit')
      expect(errorElement).toBeInTheDocument()
  })

  it('renders an error when visit creation fails', async () => {
    mockCreateVisit.mockRejectedValueOnce(new Error('Failed to create visit'))

    const { getByText } = setup('abc123')

    await waitForElementToBeRemoved(() => getByText('Creating visit...'))

    expect(getByText('Error creating visit')).toBeInTheDocument()
    expect(mockCreateVisit).toHaveBeenCalledWith('abc123')
  })

  it('redirects to the long url when visit creation is successful', async () => {
    mockCreateVisit.mockResolvedValueOnce({ data: { url: 'http://www.example.com' } })

    Object.assign(window, { location: { replace: vi.fn() } })

    const { getByText } = setup('abc123')

    await waitForElementToBeRemoved(() => getByText('Creating visit...'))

    expect(getByText('Redirecting to http://www.example.com...')).toBeInTheDocument()

    expect(mockCreateVisit).toHaveBeenCalledWith('abc123')
    expect(window.location.replace).toHaveBeenCalledWith('http://www.example.com')
  })
})
