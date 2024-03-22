import { render, screen } from '@testing-library/react'
import Alert from '../../components/Alert'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Alert />', () => {
  it('renders the alert', () => {
    const { getByRole } = render(<Alert type="success" message="Success!" show onClose={() => {}} />)
    const alertElement = getByRole('alert')
    expect(alertElement).toBeInTheDocument()
  })

  it('renders the alert message', () => {
    render(<Alert type="success" message="Success!" show onClose={() => {}} />)
    const alertElement = screen.getByText('Success!')
    expect(alertElement).toBeInTheDocument()
  })

  it('renders the close button', () => {
    render(<Alert type="success" message="Success!" show onClose={() => {}} />)
    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const { getByRole } = render(<Alert type="success" message="Success!" show onClose={onClose} />)
    await userEvent.click(getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not render when show is false', () => {
    render(<Alert type="success" message="Success!" show={false} onClose={() => {}} />)
    const alertElement = screen.queryByRole('alert')
    expect(alertElement).not.toBeInTheDocument()
  })
})
