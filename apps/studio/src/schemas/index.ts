import type { SchemaTypeDefinition } from 'sanity'

// Documents
import advancedMentory from './documents/advanced-mentory'
import banner from './documents/banner'
import companyService from './documents/company-service'
import immersion from './documents/immersion'
import lecture from './documents/lecture'
import navigation from './documents/navigation'
import page from './documents/page'
import services from './documents/services'
import settings from './documents/settings'
import testimonial from './documents/testimonials'
import workshop from './documents/workshops'
import ebookCatalog from './ebooks/catalog'
import ebookCollection from './ebooks/collection'
import landingPageSettings from './ebooks/settings'

// Objects
import badge from './objects/ebooks/badge'
import chapter from './objects/ebooks/chapter'
import chapters from './objects/ebooks/chapters'
import ebooksIndex from './objects/ebooks/content'
import coverImage from './objects/ebooks/cover-image'
import download from './objects/ebooks/download'
import metadata from './objects/ebooks/metadata'
import ebooksOverview from './objects/ebooks/overview'
import price from './objects/ebooks/price'
import landingPageSection from './objects/ebooks/section'
import themeButton from './objects/ebooks/theme/button'
import themeSchema from './objects/ebooks/theme/theme'

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

import aboutCard from './objects/about-card'
import button from './objects/button'
import icon from './objects/icon'
import link from './objects/link'
import logo from './objects/logo'
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
    landingPageSettings,
    services,
    immersion,
    advancedMentory,
    companyService,
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
    icon,

    coverImage,
    metadata,
    chapters,
    chapter,
    download,
    price,
    badge,
    landingPageSection,
    themeSchema,
    themeButton,
    pageSection,
    aboutCard,
    logo,
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
