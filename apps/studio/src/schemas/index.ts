import {
  authorObject,
  authorsObject,
  badgeObject,
  buttonObject as buttonThemeObject,
  catalogDocument,
  chapterObject,
  chaptersObject,
  collectionDocument,
  contentObject,
  coverImageObject,
  downloadObject,
  metadataObject,
  overviewObject,
  priceBadgeObject,
  priceObject,
  sealObjectObject,
  sectionObject as sectionEbookObject,
  settingsDocument as settingsEbookDocument,
  themeObject,
} from '@ez/studio/schemas/documents/ebooks'
import {
  introObject as introAboutObject,
  introItemObject as introItemAboutObject,
  servicesItemObject,
  servicesObject,
  whyChooseObject,
} from '@ez/studio/schemas/documents/landing/about'
import {
  consultingItemObject,
  consultingObject,
  coursesItemObject,
  coursesObject,
  ctaObject,
  diagnosticItemObject,
  diagnosticObject,
  lecturesItemObject,
  lecturesObject,
  testimonialItemObject,
  testimonialObject,
} from '@ez/studio/schemas/documents/landing/for-business'
import landingPageDocument from '@ez/studio/schemas/documents/landing/landing'
import {
  benefitsItemObject,
  benefitsObject,
  finalCtaObject as finalCtaMathematizerObject,
  mathematizerItemObject,
  mathematizerObject,
  whatIsObject,
  whyCompanyNeedObject,
} from '@ez/studio/schemas/documents/landing/mathematizer'
import {
  expectedResultsItemObject,
  expectedResultsObject,
  finalCtaItemObject as finalCtaItemMentoringObject,
  finalCtaObject as finalCtaMentoringObject,
  introObject as introMentoringObject,
  methodsStepItemObject,
  methodsStepObject,
  targetAudienceObject,
} from '@ez/studio/schemas/documents/landing/mentoring'
import heroObject from '@ez/studio/schemas/documents/landing/objects/hero'
import {
  linkObject,
  navigationDocument,
  navigationItemObject,
  navigationSubmenuItemObject,
} from '@ez/studio/schemas/documents/navigation'
import {
  aboutCardDocument,
  advancedMentoryDocument,
  bannerDocument,
  immersionDocument,
  lectureDocument,
  pageDocument,
  servicesDocument,
  settingsDocument,
  testimonialsDocument,
  workshopsDocument,
} from '@ez/studio/schemas/documents/site'
import {
  accordionContentLandingPageObject,
  accordionContentObject,
  accordionObject,
  alertObject,
  buttonObject as buttonEditorObject,
  cardsObject,
  dividerObject,
  ebooksObject,
  listObject,
  richTextObject,
  tabsObject,
  testimonialObject as testimonialEditorObject,
  titleObject,
} from '@ez/studio/schemas/objects/editor'
import {
  buttonObject,
  iconObject,
  logoObject,
  pageObject,
  ribbonObject,
  sectionObject,
  socialNetworksItemObject,
} from '@ez/studio/schemas/objects/global'
import {
  localizedArrayPortableTextObject,
  localizedImageObject,
  localizedSlugObject,
  localizedStringObject,
  localizedTextObject,
  localizedUrlObject,
} from '@ez/studio/schemas/objects/locale'
import seoObject from '@ez/studio/schemas/objects/seo/seo'
import type { SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Localization
    localizedSlugObject,
    localizedStringObject,
    localizedTextObject,
    localizedUrlObject,
    localizedImageObject,
    localizedArrayPortableTextObject,

    // New
    landingPageDocument,
    seoObject,
    heroObject,

    // For Business
    consultingObject,
    consultingItemObject,
    coursesObject,
    coursesItemObject,
    ctaObject,
    diagnosticObject,
    diagnosticItemObject,
    lecturesObject,
    lecturesItemObject,
    testimonialObject,
    testimonialItemObject,

    // Mathematizer
    benefitsObject,
    benefitsItemObject,
    mathematizerObject,
    mathematizerItemObject,
    whatIsObject,
    whyCompanyNeedObject,
    finalCtaMathematizerObject,

    // Mentoring
    expectedResultsObject,
    expectedResultsItemObject,
    methodsStepObject,
    methodsStepItemObject,
    introMentoringObject,
    targetAudienceObject,
    finalCtaMentoringObject,
    finalCtaItemMentoringObject,

    // About
    servicesObject,
    servicesItemObject,
    whyChooseObject,
    introAboutObject,
    introItemAboutObject,

    // Site
    settingsDocument,
    testimonialsDocument,
    workshopsDocument, // To be removed
    servicesDocument, // To be removed
    immersionDocument, // To be removed
    advancedMentoryDocument, // To be removed
    lectureDocument, // To be removed
    bannerDocument,
    pageDocument,
    aboutCardDocument, // To be removed

    // Navigation
    navigationDocument,
    navigationItemObject,
    navigationSubmenuItemObject,
    socialNetworksItemObject,
    linkObject,

    // Global
    buttonObject,
    ribbonObject,
    iconObject,
    logoObject,
    pageObject,
    sectionObject,

    // Ebook
    coverImageObject,
    metadataObject,
    sealObjectObject,
    chaptersObject,
    chapterObject,
    authorsObject,
    authorObject,
    downloadObject,
    priceObject,
    badgeObject,
    priceBadgeObject,
    overviewObject,
    contentObject,
    themeObject,
    buttonThemeObject,
    sectionEbookObject,
    catalogDocument,
    collectionDocument,
    settingsEbookDocument,

    // Editor Widgets
    buttonEditorObject,
    titleObject,
    accordionObject,
    accordionContentObject,
    accordionContentLandingPageObject,
    alertObject,
    dividerObject,
    testimonialEditorObject,
    ebooksObject,
    listObject,
    richTextObject,
    tabsObject,
    cardsObject,
  ],
}
