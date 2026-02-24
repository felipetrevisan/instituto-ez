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
  "category": coalesce(display_areas, categories, []),
  categories,
  "displayAreas": display_areas,
  "ebook_page": ebook_page,
  "masterclassPage": masterclass_page,
  "ebookPage": ebook_page,
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

export const testimonialsByHomeQuery = groq`
  *[ _type == 'testimonial' && "home" in display_areas ] | order(orderRank) [0...$limit] {
    ${fields}
  }
`

export const testimonialsByMasterclassQuery = groq`
  *[
    _type == 'testimonial' &&
    (
      (
        "masterclass" in display_areas &&
        (
          (
            defined(masterclass_page) &&
            masterclass_page._ref in [
              $masterclassId,
              $masterclassCleanId,
              $masterclassDraftId,
              $masterclassPrefixedId,
              $masterclassPrefixedDraftId
            ]
          ) ||
          !defined(masterclass_page)
        )
      ) ||
      "masterclass" in categories[]
    )
  ] | order(orderRank) {
    ${fields}
  }
`

export const testimonialsByEbookIdQuery = groq`
  *[
    _type == 'testimonial' &&
    "ebook" in display_areas &&
    defined(ebook_page) &&
    ebook_page._ref in [
      $ebookId,
      $ebookCleanId,
      $ebookDraftId,
      $ebookPrefixedId,
      $ebookPrefixedDraftId
    ]
  ] | order(orderRank) {
    ${fields}
  }
`
