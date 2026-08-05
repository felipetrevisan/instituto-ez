export type RedesignHref =
  | '/redesign'
  | '/redesign/sobre'
  | '/redesign/mentoria'
  | '/redesign/imersao'
  | '/redesign/atendimento'
  | '/redesign/matematizador'
  | '/redesign/desenvolvimento-humano'

export type RedesignNavLink = {
  label: string
  href: RedesignHref
}

export type RedesignNavIcon =
  | 'brain'
  | 'heart-handshake'
  | 'bar-chart'
  | 'building'
  | 'video'
  | 'book-open'

export type RedesignNavSubLink = {
  label: string
  description: string
  icon: RedesignNavIcon
  /** Absent means not-yet-available — rendered disabled with an "Em breve" badge. */
  href?: RedesignHref
}

export type RedesignNavEntry =
  | { kind: 'link'; label: string; href: RedesignHref }
  | { kind: 'group'; label: string; items: RedesignNavSubLink[] }

export type RedesignLayoutContent = {
  nav: {
    entries: RedesignNavEntry[]
    cta: string
  }
  footer: {
    brand: string
    tagline: string
    servicesTitle: string
    services: RedesignNavLink[]
    contactTitle: string
    email: string
    phone: string
    location: string
    copyright: string
  }
}

export type RedesignStat = { value: string; label: string }

export type RedesignTestimonial = { quote: string; name: string; role: string }

export type RedesignHomeContent = {
  hero: {
    eyebrow: string
    title: string
    highlight: string
    subtitle: string
    cta: string
  }
  neurocognitive: {
    eyebrow: string
    title: string
    highlight: string
    paragraphs: string[]
    stats: RedesignStat[]
    benefits: string[]
    cta: string
    imageAlt: string
  }
  testimonials: {
    title: string
    items: RedesignTestimonial[]
  }
  mentoring: {
    eyebrow: string
    title: string
    highlight: string
    intro: string
    cards: { icon: RedesignIcon; title: string; description: string }[]
    cta: string
  }
  business: {
    eyebrow: string
    title: string
    highlight: string
    description: string
    stats: RedesignStat[]
    benefits: string[]
    cta: string
    imageAlt: string
  }
  workshops: {
    eyebrow: string
    title: string
    intro: string
    cards: { title: string; description: string }[]
    cta: string
  }
  digitalProducts: {
    title: string
    highlight: string
    badge: string
    cardTitle: string
    cardDescription: string
    cta: string
    imageAlt: string
  }
  immersionTeaser: {
    eyebrow: string
    title: string
    paragraphs: string[]
    cta: string
    imageAlt: string
  }
}

export type RedesignIcon =
  | 'brain'
  | 'trending-up'
  | 'bar-chart'
  | 'building'
  | 'heart-handshake'
  | 'compass'

export type RedesignAboutContent = {
  hero: { title: string; subtitle: string; cta: string }
  history: { eyebrow: string; title: string; body: string; imageAlt: string }
  purpose: { title: string; body: string }
  methodology: { title: string; body: string; imageAlt: string }
  offerings: {
    eyebrow: string
    title: string
    subtitle: string
    items: { title: string; description: string }[]
  }
  closing: { title: string; body: string; cta: string }
}

export type RedesignMentoriaContent = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    cta: string
    ctaSecondary: string
    imageAlt: string
  }
  intro: { title: string; paragraphs: string[] }
  steps: {
    eyebrow: string
    title: string
    subtitle: string
    items: { number: string; title: string; description: string }[]
  }
  audience: { title: string; paragraphs: string[] }
  results: {
    title: string
    subtitle: string
    items: string[]
    stats: RedesignStat[]
    imageAlt: string
  }
  finalCta: { title: string; body: string; cta: string }
}

export type RedesignImersaoContent = {
  hero: { title: string; tags: string[]; cta: string; imageAlt: string }
  intro: { title: string; paragraphs: string[] }
  guides: {
    eyebrow: string
    title: string
    subtitle: string
    people: { name: string; role: string; bio: string }[]
    imageAlt: string
  }
  elements: {
    eyebrow: string
    title: string
    intro: string
    items: { title: string; description: string }[]
    closing: string
    cta: string
    imageAlt: string
  }
  forWhom: { eyebrow: string; title: string; items: string[]; footer: string; cta: string }
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] }
  nextClass: {
    eyebrow: string
    title: string
    details: string[]
    cta: string
    footnote: string
  }
  gallery: { title: string; imageAlt: string }
}

export type RedesignAtendimentoContent = {
  hero: { title: string; subtitle: string; cta: string; imageAlt: string }
  assessment: { eyebrow: string; title: string; paragraphs: string[] }
  sessions: {
    eyebrow: string
    title: string
    cards: { title: string; description: string }[]
    paragraphs: string[]
    cta: string
    imageAlt: string
  }
  forWhom: { title: string; paragraphs: string[]; cta: string }
  benefits: { title: string; intro: string; items: string[] }
  closing: { title: string; body: string; cta: string }
}

export type RedesignMatematizadorContent = {
  hero: { title: string; highlight: string; description: string; cta: string; imageAlt: string }
  whatIs: {
    eyebrow: string
    title: string
    subtext: string
    paragraphs: string[]
    imageAlt: string
  }
  types: {
    title: string
    items: { title: string; problem: string; action: string; result: string }[]
  }
  whyNeed: { title: string; subheading: string; cta: string; imageAlt: string }
  benefits: { title: string; items: string[] }
  closing: { title: string; text: string; footer: string; cta: string }
}

export type RedesignDesenvolvimentoContent = {
  hero: {
    title: string
    highlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  intro: { title: string; items: string[]; paragraph: string; imageAlt: string }
  workshops: {
    eyebrow: string
    title: string
    subheading: string
    cards: {
      title: string
      description: string
      text: string
      time: string
      cta: string
      categories: string[]
      imageAlt: string
    }[]
  }
  lectures: {
    eyebrow: string
    title: string
    subheading: string
    cards: {
      title: string
      tag: string
      description: string
      text: string
      cta: string
      imageAlt: string
    }[]
  }
  consulting: {
    title: string
    subheading: string
    items: string[]
    footer: string
    cta: string
    imageAlt: string
  }
  closing: { title: string; text: string; ctaPrimary: string; ctaSecondary: string }
}
