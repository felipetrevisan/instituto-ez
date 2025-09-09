import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  "author": {
    "name": author_name,
  },
  testimonial,
  categories,
`

export const testimonialsQuery = groq`
  *[ _type == 'testimonial' && $category in categories[]] | order(orderRank) { 
    ${fields}
    "ebook_page": select(
      "ebook" in categories[] => ebook_page,
      null
    )
  }
`

export const testimonialsByEbookQuery = groq`
  *[ _type == 'testimonial' && $category in categories[] && defined(ebook_page) && ebook_page->slug.current == $slug] | order(orderRank) { 
    ${fields}
  }
`
