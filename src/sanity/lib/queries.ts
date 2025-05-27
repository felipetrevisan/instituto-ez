import { groq } from 'next-sanity';

export const siteConfigQuery = groq`
  *[ _type == 'siteConfig' ][0] {
    title,
    description,
    keywords,
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
      "show": show_section
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
    }
  }
`;

export const testimonialsQuery = groq`
  *[ _type == 'testimonial' ] | order(orderRank) { 
    "id": _id,
    "author": {
      "name": author_name,
    },
    testimonial,
  }
`;

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
      "externalUrl": button_external_url
    }
  }
`;

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
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug.current,
      "externalUrl": button_external_url
    }
  }
`;

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
      "externalUrl": button_external_url
    }
  }
`;

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
      "externalUrl": button_external_url
    }
  }
`;

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
      "externalUrl": button_external_url
    }
  }
`;

export const trainingQuery = groq`
  *[ _type == 'training' ] | order(orderRank) { 
    "id": _id,
    title,
    subtitle,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`;

export const workshopQuery = groq`
  *[ _type == 'workshop' ] | order(orderRank) { 
    "id": _id,
    title,
    subtitle,
    "background": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`;

export const pageQuery = groq`* [slug.current == $slug] [0] {
  "id": _id,
  title,
  description,
  slug,
  "sections": section[] {
    title,
    content[] {
      ...,
      _type == "buttonLink" => {
        ...,
        link->{slug},
      }
    },
    "video": {
      "url": video,
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
}`;

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
`;
