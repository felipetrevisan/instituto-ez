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
  footerObject as footerThemeObject,
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
  servicesObject as servicesAboutObject,
  servicesItemObject as servicesItemAboutObject,
  whyChooseObject,
} from '@ez/studio/schemas/documents/landing/about'
import {
  catalogObject,
  heroObject as heroEbooksObject,
} from '@ez/studio/schemas/documents/landing/ebooks'
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
import {
  developmentItemObject,
  developmentObject,
  digitalProductsObject,
  immersionObject,
  mathematizerObject as mathematizerHomeObject,
  mathematizerItemObject as mathematizerItemHomeObject,
  mentorShipItemObject,
  mentorShipObject,
  servicesObject as servicesHomeObject,
  servicesItemObject as servicesItemHomeObject,
} from '@ez/studio/schemas/documents/landing/home'
import landingPageDocument from '@ez/studio/schemas/documents/landing/landing'
import {
  benefitsItemObject as benefitsItemMathematizerObject,
  benefitsObject as benefitsMathematizerObject,
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
  assessmentObject,
  benefitsItemObject as benefitsItemServicesObject,
  benefitsObject as benefitsServicesObject,
  finalCtaObject as finalCtaServicesObject,
  methodSessionsItemObject,
  methodSessionsObject,
  whoIsItForObject,
} from '@ez/studio/schemas/documents/landing/services'
import {
  linkObject,
  navigationDocument,
  navigationItemObject,
  navigationSubmenuItemObject,
} from '@ez/studio/schemas/documents/navigation'
import {
  pageDocument,
  settingsDocument,
  testimonialsDocument,
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
    benefitsMathematizerObject,
    benefitsItemMathematizerObject,
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
    servicesAboutObject,
    servicesItemAboutObject,
    whyChooseObject,
    introAboutObject,
    introItemAboutObject,

    // Services
    assessmentObject,
    benefitsServicesObject,
    benefitsItemServicesObject,
    methodSessionsObject,
    methodSessionsItemObject,
    whoIsItForObject,
    finalCtaServicesObject,

    // Home
    servicesHomeObject,
    servicesItemHomeObject,
    mathematizerHomeObject,
    mathematizerItemHomeObject,
    mentorShipObject,
    mentorShipItemObject,
    developmentObject,
    developmentItemObject,
    digitalProductsObject,
    immersionObject,

    // Ebooks
    catalogObject,
    heroEbooksObject,

    // Site
    settingsDocument,
    testimonialsDocument,
    pageDocument,

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
    footerThemeObject,
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
