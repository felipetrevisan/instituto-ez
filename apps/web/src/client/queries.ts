import { groq } from 'next-sanity'

export const siteConfigQuery = groq`
  *[ _type == 'siteConfig' ][0] {
    title,
    description,
    keywords,
    "contact": {
      "form": contactForm,
      "email": email,
    },
    "logo": logo {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "hero": hero[] { 
      "background": background_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }, 
      title, 
      description 
    },
    "sections": sections_home[] {
      "key": key_section,
      "show": show_section,
      "title": section_title,
      "subtitle": section_subtitle
    },
    "primaryNavigation": main_nav-> {
      "items": items[] {
        "id": _key,
        "hasSubmenu": has_submenu,
        "label": navigation_label,
        "columns": submenu_columns,
        "submenu": navigation_submenu_items[] {
          "label": navigation_label,
          "url": navigation_item_url {
            "isHome": is_home,
            "type": link_type,
            "link": internal_link->slug.current,
            "externalUrl": external_url,
          }
        },
        "url": navigation_item_url {
          "isHome": is_home,
          "type": link_type,
          "link": internal_link->slug.current,
          "externalUrl": external_url
        }
      }
    },
    "socialNavigation": social_nav-> {
      "items": social_items[] {
        "id": _key,
        "url": social_network_url,
        "label": social_network_label,
        "icon": social_network_icon,
        
      }
    },
    "testimonialsConfig": {
      "type": testimonials_type,
      "theme": testimonials_theme,
      "variant": testimonials_variant,
      "rounded": testimonials_rounded,
    }
  }
`

export const testimonialsQuery = groq`
  *[ _type == 'testimonial' && $category in categories[]] | order(orderRank) { 
    "id": _id,
    "author": {
      "name": author_name,
    },
    testimonial,
    categories
  }
`

export const immersionQuery = groq`
  *[ _type == 'immersion' ][0] { 
    "id": _id,
    title,
    content,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "ribbon": ribbon {
      "show": show_ribbon,
      "text": ribbon_text
    },
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const servicesQuery = groq`
  *[ _type == 'service' ] | order(orderRank) { 
    "id": _id,
    title,
    "image": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    disabled,
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const lectureQuery = groq`
  *[ _type == 'lecture' ] | order(orderRank) { 
    "id": _id,
    title,
    content,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const advancedMentoryQuery = groq`
  *[ _type == 'advanced-mentory' ][0] { 
    "id": _id,
    title,
    content,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "ribbon": ribbon {
      "show": show_ribbon,
      "text": ribbon_text
    },
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const mathematizerQuery = groq`
  *[ _type == 'mathematizer' ] | order(orderRank) { 
    "id": _id,
    title,
    content,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const ebookQuery = groq`
  *[ _type == 'ebook' ] | order(orderRank) { 
    "id": _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    "image": images {
      "background": background_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "preview": small_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "large": large_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }
    },
    disabled,
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const ebookQueryBySlug = groq`
  *[ _type == 'ebook' && slug.current == $slug] [0] { 
    "id": _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    theme,
    "seo": {
      "description": seoDescription,
      "keywords": seoKeywords
    },
    "overview": overview {
      title,
      description
    },
    "index": index {
      title,
      description
    },
    "questions": questions[] {
      title,
      "text": content
    },
    "chapter": chapter {
      "cover": cover {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "chapters": chapters[] {
        content,
        title
      }
    },
    "metadata": data[] {
      "media": media {
        type,
        icon,
        image
      },
      suffix,
      prefix,
      title,
      value,
      type
    },
    "image": images {
      "preview": small_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "large": large_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }
    },
    disabled,
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const ebooksCollectionQuery = groq`
  *[ _type == 'ebooks-collection'] { 
    "id": _id,
    title,
    ebooks[]->{
      "id": _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      "image": images {
        "preview": small_image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        },
        "large": large_image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      disabled,
      "button": button {
        "visible": show_button,
        "disabled": disable_button,
        "label": button_label,
        "type": button_link_type,
        "link": button_internal_link->slug.current,
        "params": button_internal_params,
        "externalUrl": button_external_url
      }
    }
  }
`

export const ebooksCollectionQueryByCollection = groq`
  *[ _type == 'ebooks-collection' && _id == $id] [0] { 
    "id": _id,
    title,
    ebooks[]->{
      "id": _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      "image": images {
        "preview": small_image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        },
        "large": large_image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      disabled,
      "button": button {
        "visible": show_button,
        "disabled": disable_button,
        "label": button_label,
        "type": button_link_type,
        "link": button_internal_link->slug.current,
        "params": button_internal_params,
        "externalUrl": button_external_url
      }
    }
  }
`

export const workshopQuery = groq`
  *[ _type == 'workshop' ] | order(orderRank) { 
    "id": _id,
    title,
    subtitle,
    disabled,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`

export const pageQueryWithSlug = groq`*[ _type == 'page' && slug.current == $slug] [0] {
  "id": _id,
  title,
  description,
  slug,
  "sections": section[] {
    title,
    hash,
    "media": {
      "type": background_type,
      background_type == "IMAGE" => {
        "image": image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      background_type == "VIDEO" => {
        "video": {
          "url": video
        }
      }
    },
    content[] {
      ...,
      _type == "buttonLink" => {
        ...,
        link->{slug},
      }
    },
    "background": {
      "image": background {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "title": background_title
    }
  }
}`

export const pageQuery = groq`*[ _type == 'page'] {
  "id": _id,
  title,
  description,
  "slug": slug.current
}`

export const bannerQuery = groq`
  *[ _type == 'banner' ] | order(orderRank) { 
    "id": _id,
    title,
    subtitle,
    "image": background_image {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`
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
