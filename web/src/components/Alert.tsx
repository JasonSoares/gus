export interface Props {
  type: 'success' | 'error'
  message: string
  show: boolean
  onClose: () => void
}

function Alert({ type, message, show, onClose }: Props) {
  const backgroundColor = type === 'error' ? 'bg-red-200' : 'bg-indigo-200'
  const textColor = type === 'error' ? 'text-red-900' : 'text-indigo-900'
  const borderColor = type === 'error' ? 'border-red-900' : 'border-indigo-900'

  return (
    show && (
      <div
        className={`flex justify-between items-center px-4 py-3 ${backgroundColor} ${textColor} border ${borderColor} rounded relative`}
        role="alert"
      >
        <strong>{message}</strong>
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose()}
          className="text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    )
  )
}

export default Alert
