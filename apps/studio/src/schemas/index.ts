import {
  authorObject,
  authorsObject,
  badgeObject,
  catalogDocument,
  categoryDocument,
  chapterObject,
  chaptersObject,
  contentObject,
  coverImageObject,
  downloadObject,
  ebookPriceDocument,
  ebookThemeDocument,
  metadataObject,
  overviewObject,
  priceObject,
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
  ctaObject as ctaEbooksObject,
  ebooksObject,
  heroObject as heroEbooksObject,
  masterclassObject,
} from '@ez/studio/schemas/documents/landing/digital-products'
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
import {
  experienceElementsObject,
  experienceFeaturedElementObject,
  experienceObject,
  faqItemObject,
  faqObject,
  finalCtaObject as finalCtaImmersionObject,
  instructorItemObject,
  instructorObject,
  introObject as introImmersionObject,
  mainTargetItemObject,
  mainTargetObject,
  nextClassItemObject,
  nextClassObject,
} from '@ez/studio/schemas/documents/landing/immersion'
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
import { masterclassDocument } from '@ez/studio/schemas/documents/masterclass'
import {
  linkObject,
  navigationDocument,
  navigationItemObject,
} from '@ez/studio/schemas/documents/navigation'
import { settingsDocument, testimonialsDocument } from '@ez/studio/schemas/documents/site'
import {
  accordionContentLandingPageObject,
  accordionContentObject,
  accordionObject,
  quoteObject,
  richTextObject,
} from '@ez/studio/schemas/objects/editor'
import {
  buttonObject,
  logoObject,
  mediaObject,
  socialNetworksItemObject,
} from '@ez/studio/schemas/objects/global'
import {
  localeImageValueObject,
  localePortableTextValueObject,
  localeStringValueObject,
  localeTextValueObject,
  localeUrlValueObject,
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
    localeStringValueObject,
    localeTextValueObject,
    localePortableTextValueObject,
    localeUrlValueObject,
    localeImageValueObject,
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

    // Immersion
    introImmersionObject,
    experienceObject,
    experienceElementsObject,
    experienceFeaturedElementObject,
    instructorObject,
    instructorItemObject,
    mainTargetObject,
    mainTargetItemObject,
    finalCtaImmersionObject,
    faqObject,
    faqItemObject,
    nextClassObject,
    nextClassItemObject,

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

    // Digital Products
    ebooksObject,
    masterclassObject,
    ctaEbooksObject,
    heroEbooksObject,

    // Masterclass
    masterclassDocument,

    // Site
    settingsDocument,
    testimonialsDocument,

    // Navigation
    navigationDocument,
    navigationItemObject,
    socialNetworksItemObject,
    linkObject,

    // Global
    buttonObject,
    logoObject,
    mediaObject,

    // Ebook
    coverImageObject,
    metadataObject,
    chaptersObject,
    chapterObject,
    authorsObject,
    authorObject,
    downloadObject,
    priceObject,
    badgeObject,
    overviewObject,
    contentObject,
    themeObject,
    sectionEbookObject,
    catalogDocument,
    categoryDocument,
    ebookPriceDocument,
    ebookThemeDocument,
    settingsEbookDocument,

    // Editor Widgets
    accordionObject,
    accordionContentObject,
    accordionContentLandingPageObject,
    richTextObject,
    quoteObject,
  ],
}
