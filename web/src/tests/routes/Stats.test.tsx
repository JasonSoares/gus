import { render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getStats } from '../../services/api'
import Stats from '../../routes/Stats'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const setup = () => render(
  <MemoryRouter initialEntries={[`/stats`]} >
    <Routes>
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </MemoryRouter>
)

vi.mock('../../services/api.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/api.ts')>()
  return {
    ...mod,
    getStats: vi.fn().mockResolvedValue({ data: [] })
  }
})

const mockGetStats = vi.mocked(getStats)

describe('<Stats />', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders the stats', async () => {
    mockGetStats.mockResolvedValueOnce({
      data: [{ slug: 'abc123', url: 'http://example.com', visit_count: 1 }]
    })

    const { getByText } = setup()
    expect(getByText('Stats')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText('http://localhost:3000/abc123')).toBeInTheDocument()
      expect(getByText('http://example.com')).toBeInTheDocument()
      expect(getByText('1')).toBeInTheDocument()
    })
  })

  it('renders a message if the data is empty', async () => {
    mockGetStats.mockResolvedValueOnce({ data: [] })

    const { getByText, queryByRole } = setup()

    await waitFor(() => {
      expect(getByText('No short URLs yet.', {exact: false})).toBeInTheDocument()
    })

    expect(queryByRole('link', {name: 'Download CSV'})).not.toBeInTheDocument()
  })

  it('renders a messages if there is an error fetching the data', async () => {
    mockGetStats.mockRejectedValueOnce(new Error('Error fetching stats'))

    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Error loading stats')).toBeInTheDocument()
    })
  })
})
