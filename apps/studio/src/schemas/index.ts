import type { SchemaTypeDefinition } from 'sanity'

import advancedMentory from './documents/advanced-mentory'
import immersion from './documents/immersion'
import lecture from './documents/lecture'
import mathematizer from './documents/mathematizer'
import services from './documents/services'
import testimonial from './documents/testimonials'
import workshop from './documents/workshops'
import ebookCatalog from './ebooks/catalog'
import ebookCollection from './ebooks/collection'

import banner from './documents/banner'
import settings from './documents/settings'

import navigation from './documents/navigation'
import page from './documents/page'

import aboutCard from './objects/about-card'
import button from './objects/button'
import coverImage from './objects/cover-image'
import chapters from './objects/ebooks/chapters'
import metadata from './objects/ebooks/metadata'
import theme from './objects/ebooks/theme'
import icon from './objects/icon'
import link from './objects/link'
import navigationItem from './objects/navigation-item'
import navigationSubmenuItem from './objects/navigation-submenu-item'
import pageSection from './objects/page'
import ribbon from './objects/ribbon'
import section from './objects/section'
import socialNetworksItem from './objects/social-networks-item'

import accordionWidget from './objects/editor/accordion'
import accordionContentWidget from './objects/editor/accordion-content'
import alertWidget from './objects/editor/alert'
import buttonLinkWidget from './objects/editor/button'
import dividerWidget from './objects/editor/divider'
import ebooksWidget from './objects/editor/ebooks'
import listWidget from './objects/editor/list'
import richText from './objects/editor/rich-text'
import tabsWidget from './objects/editor/tabs'
import testimonialWidget from './objects/editor/testimonial'
import titleWidget from './objects/editor/title'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
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
  ],
}
