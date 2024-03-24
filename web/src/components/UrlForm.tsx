
import { Control, useController, UseFormHandleSubmit } from 'react-hook-form'
import Alert from './Alert'

type FormMode = 'shorten' | 'copy'

export interface FormFields {
  url: string
}

export interface Props {
  mode: FormMode
  control: Control<FormFields>
  submitHandler: ({ url }: FormFields) => void
  handleSubmit: UseFormHandleSubmit<FormFields>
  inputChanged?: () => void
  clearErrors: () => void
}

function validUrl(inputUrl: string): boolean {
  try {
    const url = new URL(inputUrl)

    return url.origin.startsWith('http://') || url.origin.startsWith('https://')
  } catch {
    return false
  }
}

function UrlForm({
  submitHandler,
  inputChanged,
  mode,
  control,
  handleSubmit,
  clearErrors
}: Props) {
  const { field, fieldState, formState } = useController({
    control,
    name: 'url',
    defaultValue: '',
    rules: { required: 'Please enter a URL', validate: validUrl }
  })
  const { isSubmitting, errors } = formState

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex items-center border-2 border-indigo-700 rounded">
        <input className=" w-full text-gray-800 px-3 leading-tight focus:outline-none"
          type="text"
          aria-label="Enter a url"
          aria-invalid={fieldState.error ? 'true' : 'false'}
          autoFocus
          {...field}
          onChange={(e) => {
            field.onChange(e)
            inputChanged && inputChanged()
          }}
          placeholder="https://www.example.com"
        />
        <button disabled={isSubmitting} type="submit" className="disabled:opacity-50 bg-indigo-700 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-white py-2 px-6">
          {isSubmitting ? '...' : mode =='shorten' ? 'Shorten' : 'Copy'}
        </button>
      </div>

      <div className="my-1">
        <Alert show={!!errors.url}
          onClose={() => clearErrors()}
          type="error" message={errors?.url?.message?.toString() || 'Please enter a valid URL starting with http:// or https://'} />
      </div>
    </form>
  )
}

export default UrlForm
