import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  "author": {
    "name": author_name,
    "role": author_role,
  },
  "rating": rating,
  "showStars": show_stars,
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
  *[ _type == 'testimonial' && $category in categories[] && defined(ebook_page) && ebook_page->slug[$locale].current == $slug] | order(orderRank) { 
    ${fields}
  }
`
