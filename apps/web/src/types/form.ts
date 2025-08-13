export type Form = {
  title: string
  showtitle: boolean
  _id: string
  id: string
  class?: string
  fields: FormField[]
  submitButtonText: string
}

export type FormField = {
  label: string
  name: string
  type:
    | 'text'
    | 'email'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'hidden'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'url'
    | 'search'
    | 'tel'
    | 'color'
  isRequired: boolean
  helpText?: string
  note?: string
  showPlaceholder?: boolean
  selectOptions?: string[]
  placeholder?: string
  radioOptions?: string[]
  checkboxOptions?: string[]
  options?: { value: string; label: string }[]
}
