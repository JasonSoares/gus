import { useState } from 'react'
import UrlForm, { FormFields } from '../components/UrlForm'
import { FormMode } from '../types/UrlForm'
import { useForm } from 'react-hook-form'
import { createShortUrl } from '../services/api'
import Alert from '../components/Alert'

function buildShortUrl(slug: string) {
  return `${window.location.origin}/${slug}`
}

function alreadyShortUrl(url: string) {
  return url.startsWith(window.location.origin)
}

function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [formMode, setFormMode] = useState<FormMode>('shorten')
  const {
    setValue: setFormValue,
    control,
    handleSubmit,
    resetField,
    setError: setFormError,
    clearErrors
  } = useForm<FormFields>({ defaultValues: { url: '' }})

  function showSuccessAlert(message: string) {
    setAlertType('success')
    setAlertMessage(message)
    setShowAlert(true)
  }

  function showErrorAlert(message: string) {
    setAlertType('error')
    setAlertMessage(message)
    setShowAlert(true)
  }

  function clearAlert() {
    setShowAlert(false)
  }

  function copyUrlToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      showSuccessAlert('Copied to clipboard!')
    }).catch(() => {
      showErrorAlert('Failed to copy to clipboard')
    })
  }

  function inputChanged() {
    if (formMode === 'copy') {
      setFormMode('shorten')
    }
  }

  const submitHandler = async ({ url }: FormFields) => {
    if (formMode === 'copy') {
      copyUrlToClipboard(url)
    } else if (alreadyShortUrl(url)) {
      setFormError('url', { type: 'manual', message: 'Already a short URL' })
    } else {
      try {
        const { data } = await createShortUrl(url)

        if (!data?.slug) {
          showErrorAlert('Failed to shorten URL')
          return
        }

        const newShortUrl = buildShortUrl(data.slug)

        setFormMode('copy')
        resetField('url')
        setFormValue('url', newShortUrl, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false
        })

        clearAlert()
        showSuccessAlert('Shortened URL created!')

      } catch (error) {
        showErrorAlert('Failed to shorten URL')
      }
    }
  }

  return (
    <div className="w-full mt-4 py-10 px-10 border shadow-md bg-white">
      <UrlForm
        handleSubmit={handleSubmit}
        control={control}
        submitHandler={submitHandler}
        mode={formMode}
        inputChanged={inputChanged}
        clearErrors={clearErrors}
      />

      <Alert type={alertType} message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  )
}

export default App
