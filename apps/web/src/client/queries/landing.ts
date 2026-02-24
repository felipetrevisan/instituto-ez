import { groq } from 'next-sanity'

const pageFields = `
  slug,
`

const seoImageField = `
  "image": page.image {
    "asset": asset,
    "metadata": {
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    }
  },
`

const buttonFields = `
   _key,
  "label": button_label,
  "iconPrefix": button_icon_prefix,
  "iconSuffix": button_icon_suffix,
  "type": button_link_type,
  "link": select(
    button_link_type == "INTERNAL" || button_link_type == "LANDING" =>
      button_internal_link->slug,
    null
  ),
  "externalUrl": select(
    button_link_type == "EXTERNAL" => button_external_url,
    null
  ),
  "scrollTo": select(
    button_link_type == "HASH" => button_scroll_to,
    null
  ),
  "dialog": select(
    button_link_type == "DIALOG" => {
      "type": dialog_type,
      "subject": dialog_contact_subject
    },
    null
  ),
  "theme": {
    theme,
    variant,
    size
  }
`

const ctaField = `
  "cta": select(
    _type == "section.hero" || 
    _type == "mathematizer.cta" || 
    _type == "forbusiness.cta" || 
    _type == "mentoring.cta" ||
    _type == "about.cta" ||
    _type == "services.cta" ||
    _type == "home.cta" ||
    _type == "home.services" ||
    _type == "home.mentorship" ||
    _type == "home.development" ||
    _type == "home.mathematizer" ||
    _type == "home.immersion" ||
    _type == "services.methodsessions" ||
    _type == "services.whoisitfor" ||
    _type == "immersion.experience" ||
    _type == "immersion.final-cta" ||
    _type == "immersion.next-class" ||
    _type == "masterclass.hero" ||
    _type == "masterclass.for-who" ||
    _type == "masterclass.problem" ||
    _type == "masterclass.expert" ||
    _type == "masterclass.final-cta" ||
    _type == "masterclass.catalog" ||
    _type == "ebooks.cta" => cta[] {
      ...,
     ${buttonFields}
    },
    cta {
      ...,
      ${buttonFields}
    } 
  )
`

export const landingPageQuery = groq`*[ _type == 'landingPage' && slug[$locale].current == $slug] [0] {
  "id": _id,
  key,
  "settings": {
    ...page,
    ${pageFields}
    ${seoImageField}
  },
  sections[] {
    ...,
    ${ctaField},
    _type == "forbusiness.courses" || _type == "forbusiness.lectures" => {
      "items": items[] {
        ...,
        "cta": cta {
          ${buttonFields}
        }
      }
    },
    _type == "masterclass.for-who" || _type == "masterclass.problem" => {
      "cta": cta[] {
        ...,
        ${buttonFields}
      }
    },
    _type == "masterclass.final-cta" => {
      "ctaOptions": ctaOptions[] {
        ...,
        "cta": cta {
          ${buttonFields}
        }
      }
    },
    _type == "masterclass.testimonials" => {
      "testimonials": testimonials[]-> {
        "id": _id,
        "author": {
          "name": author_name,
          "role": author_role
        },
        "rating": rating,
        "showStars": show_stars,
        testimonial
      }
    },
    _type == "home.digitalproducts" => {
      "cards": cards[] {
        ...,
        "button": button {
          ${buttonFields}
        }
      }
    },
    _type == "masterclass.catalog" => {
      "featured": featured {
        ...,
        "masterclass": masterclass->{
          slug,
          _id
        },
        "masterclassRef": masterclass._ref,
        "masterclassId": masterclass->_id,
        "masterclassSlug": coalesce(
          masterclass->slug[$locale].current,
          masterclass->slug[$locale],
          masterclass->slug.current,
          masterclass->slug
        )
      },
      "items": items[] {
        ...,
        "masterclass": masterclass->{
          slug,
          _id
        },
        "masterclassRef": masterclass._ref,
        "masterclassId": masterclass->_id,
        "masterclassSlug": coalesce(
          masterclass->slug[$locale].current,
          masterclass->slug[$locale],
          masterclass->slug.current,
          masterclass->slug
        )
      },
      "ctaOptions": ctaOptions[] {
        ...,
        "cta": cta {
          ${buttonFields}
        }
      }
    }
  }
}`
