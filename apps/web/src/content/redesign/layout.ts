import type { Locale } from 'next-intl'
import type { RedesignLayoutContent } from './types'

/**
 * Shared nav/footer copy for the redesign. Nav destinations, footer
 * services/contact, and copyright text are pulled from the live site's
 * real header/footer (/pt/home) — not placeholders. Nav is grouped into
 * "Serviços" and "Produtos Digitais" submenus, matching how the live site
 * organizes the same destinations under dropdowns.
 * en/es are draft translations pending review.
 */
export const redesignLayoutContent: Record<Locale, RedesignLayoutContent> = {
  pt: {
    nav: {
      entries: [
        { kind: 'link', label: 'Início', href: '/redesign' },
        { kind: 'link', label: 'Sobre', href: '/redesign/sobre' },
        {
          kind: 'group',
          label: 'Serviços',
          items: [
            {
              label: 'Atendimentos Individuais',
              description: 'Exercícios neurocognitivos para saúde mental e clareza.',
              icon: 'brain',
              href: '/redesign/atendimento',
            },
            {
              label: 'Mentoria & Assessoria',
              description: 'Acompanhamento estratégico para alta performance.',
              icon: 'heart-handshake',
              href: '/redesign/mentoria',
            },
            {
              label: 'Sistema Neuroanalítico',
              description: 'Métricas reais para decisões empresariais.',
              icon: 'bar-chart',
              href: '/redesign/matematizador',
            },
            {
              label: 'Desenvolvimento Humano',
              description: 'Workshops e palestras corporativas.',
              icon: 'building',
              href: '/redesign/desenvolvimento-humano',
            },
          ],
        },
        { kind: 'link', label: 'Imersão', href: '/redesign/imersao' },
        {
          kind: 'group',
          label: 'Produtos Digitais',
          items: [
            {
              label: 'Masterclass',
              description: 'Módulos em vídeo sobre neurociência e comportamento.',
              icon: 'video',
            },
            {
              label: 'Ebooks',
              description: 'Leituras estruturadas para aprofundar o conhecimento.',
              icon: 'book-open',
            },
          ],
        },
      ],
      cta: 'Começar',
    },
    footer: {
      brand: 'Instituto EZ',
      tagline: 'Desenvolvimento Humano',
      servicesTitle: 'Serviços',
      services: [
        { label: 'Atendimentos Individuais', href: '/redesign/atendimento' },
        { label: 'Mentoria & Assessoria', href: '/redesign/mentoria' },
        { label: 'Matematizadores', href: '/redesign/matematizador' },
        { label: 'Imersão Despertar', href: '/redesign/imersao' },
      ],
      contactTitle: 'Contato',
      email: 'contato@institutoez.com.br',
      phone: '(11) 99920-1723',
      location: 'São Paulo - Brasil',
      copyright: '© 2026 Instituto EZ. Todos os direitos reservados.',
    },
  },
  en: {
    nav: {
      entries: [
        { kind: 'link', label: 'Home', href: '/redesign' },
        { kind: 'link', label: 'About', href: '/redesign/sobre' },
        {
          kind: 'group',
          label: 'Services',
          items: [
            {
              label: 'Individual Sessions',
              description: 'Neurocognitive exercises for mental health and clarity.',
              icon: 'brain',
              href: '/redesign/atendimento',
            },
            {
              label: 'Mentoring & Advisory',
              description: 'Strategic guidance for high performance.',
              icon: 'heart-handshake',
              href: '/redesign/mentoria',
            },
            {
              label: 'Neuroanalytic System',
              description: 'Real metrics for business decisions.',
              icon: 'bar-chart',
              href: '/redesign/matematizador',
            },
            {
              label: 'Human Development',
              description: 'Corporate workshops and lectures.',
              icon: 'building',
              href: '/redesign/desenvolvimento-humano',
            },
          ],
        },
        { kind: 'link', label: 'Immersion', href: '/redesign/imersao' },
        {
          kind: 'group',
          label: 'Digital Products',
          items: [
            {
              label: 'Masterclass',
              description: 'Video modules on neuroscience and behavior.',
              icon: 'video',
            },
            {
              label: 'Ebooks',
              description: 'Structured reading to go deeper.',
              icon: 'book-open',
            },
          ],
        },
      ],
      cta: 'Get Started',
    },
    footer: {
      brand: 'Instituto EZ',
      tagline: 'Human Development',
      servicesTitle: 'Services',
      services: [
        { label: 'Individual Sessions', href: '/redesign/atendimento' },
        { label: 'Mentoring & Advisory', href: '/redesign/mentoria' },
        { label: 'Neuroanalytic System', href: '/redesign/matematizador' },
        { label: 'Immersion', href: '/redesign/imersao' },
      ],
      contactTitle: 'Contact',
      email: 'contato@institutoez.com.br',
      phone: '+55 (11) 99920-1723',
      location: 'São Paulo - Brazil',
      copyright: '© 2026 Instituto EZ. All rights reserved.',
    },
  },
  es: {
    nav: {
      entries: [
        { kind: 'link', label: 'Inicio', href: '/redesign' },
        { kind: 'link', label: 'Nosotros', href: '/redesign/sobre' },
        {
          kind: 'group',
          label: 'Servicios',
          items: [
            {
              label: 'Atenciones Individuales',
              description: 'Ejercicios neurocognitivos para salud mental y claridad.',
              icon: 'brain',
              href: '/redesign/atendimento',
            },
            {
              label: 'Mentoría & Asesoría',
              description: 'Acompañamiento estratégico para alto desempeño.',
              icon: 'heart-handshake',
              href: '/redesign/mentoria',
            },
            {
              label: 'Sistema Neuroanalítico',
              description: 'Métricas reales para decisiones empresariales.',
              icon: 'bar-chart',
              href: '/redesign/matematizador',
            },
            {
              label: 'Desarrollo Humano',
              description: 'Workshops y conferencias corporativas.',
              icon: 'building',
              href: '/redesign/desenvolvimento-humano',
            },
          ],
        },
        { kind: 'link', label: 'Inmersión', href: '/redesign/imersao' },
        {
          kind: 'group',
          label: 'Productos Digitales',
          items: [
            {
              label: 'Masterclass',
              description: 'Módulos en video sobre neurociencia y comportamiento.',
              icon: 'video',
            },
            {
              label: 'Ebooks',
              description: 'Lecturas estructuradas para profundizar.',
              icon: 'book-open',
            },
          ],
        },
      ],
      cta: 'Comenzar',
    },
    footer: {
      brand: 'Instituto EZ',
      tagline: 'Desarrollo Humano',
      servicesTitle: 'Servicios',
      services: [
        { label: 'Atenciones Individuales', href: '/redesign/atendimento' },
        { label: 'Mentoría & Asesoría', href: '/redesign/mentoria' },
        { label: 'Sistema Neuroanalítico', href: '/redesign/matematizador' },
        { label: 'Inmersión Despertar', href: '/redesign/imersao' },
      ],
      contactTitle: 'Contacto',
      email: 'contato@institutoez.com.br',
      phone: '+55 (11) 99920-1723',
      location: 'São Paulo - Brasil',
      copyright: '© 2026 Instituto EZ. Todos los derechos reservados.',
    },
  },
}
