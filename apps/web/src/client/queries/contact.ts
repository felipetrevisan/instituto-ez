import { groq } from 'next-sanity'

export const contactFormQuery = groq`
  *[_type == "contactForm" && _id == $formId] {
    title,
    showtitle,
    _id,
    id,
    class,
    fields[] {
      label,
      name,
      type,
      isRequired,
      helpText,
      note,
      showPlaceholder,
      selectOptions,
      placeholder,
      radioOptions,
      checkboxOptions,
      options[]{
        value,
        label
      },
    },
    submitButtonText
  }[0]
`
