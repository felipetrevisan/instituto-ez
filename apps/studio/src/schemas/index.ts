import type { SchemaTypeDefinition } from 'sanity'

// Documents
import advancedMentory from './documents/advanced-mentory'
import banner from './documents/banner'
import immersion from './documents/immersion'
import lecture from './documents/lecture'
import mathematizer from './documents/mathematizer'
import navigation from './documents/navigation'
import page from './documents/page'
import services from './documents/services'
import settings from './documents/settings'
import testimonial from './documents/testimonials'
import workshop from './documents/workshops'
import ebookCatalog from './ebooks/catalog'
import ebookCollection from './ebooks/collection'

// Objects
import aboutCard from './objects/about-card'
import button from './objects/button'
import coverImage from './objects/cover-image'
import chapters from './objects/ebooks/chapters'
import ebooksIndex from './objects/ebooks/content'
import metadata from './objects/ebooks/metadata'
import ebooksOverview from './objects/ebooks/overview'
import theme from './objects/ebooks/theme'
import accordionWidget from './objects/editor/accordion'
import accordionContentWidget from './objects/editor/accordion-content'
import alertWidget from './objects/editor/alert'
import buttonLinkWidget from './objects/editor/button'
import cardsWidget from './objects/editor/cards'
import dividerWidget from './objects/editor/divider'
import ebooksWidget from './objects/editor/ebooks'
import listWidget from './objects/editor/list'
import richText from './objects/editor/rich-text'
import tabsWidget from './objects/editor/tabs'
import testimonialWidget from './objects/editor/testimonial'
import titleWidget from './objects/editor/title'
import icon from './objects/icon'
import link from './objects/link'
import navigationItem from './objects/navigation-item'
import navigationSubmenuItem from './objects/navigation-submenu-item'
import pageSection from './objects/page'
import ribbon from './objects/ribbon'
import section from './objects/section'
import socialNetworksItem from './objects/social-networks-item'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    settings,
    testimonial,
    workshop,
    ebookCatalog,
    ebookCollection,
    services,
    immersion,
    advancedMentory,
    mathematizer,
    lecture,
    banner,
    page,
    navigation,

    // Objects
    navigationItem,
    navigationSubmenuItem,
    socialNetworksItem,
    link,
    button,
    ribbon,
    coverImage,
    icon,
    metadata,
    chapters,
    theme,
    pageSection,
    aboutCard,
    section,
    ebooksOverview,
    ebooksIndex,
    
    // Editor Widgets
    buttonLinkWidget,
    titleWidget,
    accordionWidget,
    accordionContentWidget,
    alertWidget,
    dividerWidget,
    testimonialWidget,
    ebooksWidget,
    listWidget,
    richText,
    tabsWidget,
    cardsWidget,
  ],
}
