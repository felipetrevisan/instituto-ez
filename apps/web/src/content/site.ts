// Textos fixos extraídos de https://institutoez.com.br (versão PT).

export const site = {
  name: 'Instituto EZ',
  slogan: 'Desenvolvimento Humano',
  fullName: 'Instituto do Comportamento Humano e Inovação EZ',
  description: 'Onde neurociência, comportamento humano e estratégia se integram.',
  logo: '/assets/logo.png',
  contact: {
    email: 'contato@institutoez.com.br',
    phone: '(11) 99920-1723',
    phoneHref: 'tel:+5511999201723',
    location: 'São Paulo - Brasil',
  },
  copyright: 'Todos os direitos reservados.',
}

export type NavChild = { label: string; href: string }
export type NavItem = {
  label: string
  href: string
  comingSoon?: boolean
  children?: NavChild[]
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Sobre',
    href: '/sobre-nos',
    children: [
      { label: 'Serviços', href: '/sobre-nos#services' },
      { label: 'Metodologia', href: '/sobre-nos#why-choose' },
    ],
  },
  {
    label: 'Atendimentos',
    href: '/atendimento',
    children: [
      { label: 'Avaliação Inicial', href: '/atendimento#assessment' },
      { label: 'O Método', href: '/atendimento#method-sessions' },
      { label: 'Para Quem é?', href: '/atendimento#who-is-it-for' },
      { label: 'Benefícios', href: '/atendimento#benefits' },
    ],
  },
  {
    label: 'Mentoria & Assessoria',
    href: '/mentoria-e-assessoria',
    children: [
      { label: 'A Mentoria', href: '/mentoria-e-assessoria#intro' },
      { label: 'Métodos', href: '/mentoria-e-assessoria#methods-step' },
      { label: 'Para quem é', href: '/mentoria-e-assessoria#target-audience' },
      { label: 'Resultados', href: '/mentoria-e-assessoria#results' },
    ],
  },
  {
    label: 'Sistema Neuroanalítico',
    href: '/matematizador',
    children: [
      { label: 'O que é?', href: '/matematizador#what-is' },
      { label: 'Matematizadores', href: '/matematizador#mathematizers' },
      { label: 'Por que precisam', href: '/matematizador#why-i-need' },
      { label: 'Benefícios', href: '/matematizador#benefits' },
    ],
  },
  {
    label: 'Desenvolvimento Humano',
    href: '/desenvolvimento-humano',
    children: [
      { label: 'Diagnóstico', href: '/desenvolvimento-humano#diagnosis' },
      { label: 'Cursos', href: '/desenvolvimento-humano#courses' },
      { label: 'Consultoria', href: '/desenvolvimento-humano#consulting' },
      { label: 'Impacto', href: '/desenvolvimento-humano#testimonials' },
    ],
  },
  {
    label: 'Imersão',
    href: '/imersao',
    children: [
      { label: 'O que é?', href: '/imersao#intro' },
      { label: 'Professores', href: '/imersao#instructors' },
      { label: 'Conteúdo', href: '/imersao#experience' },
      { label: 'Para quem é', href: '/imersao#main-target' },
      { label: 'Galeria', href: '/imersao#final-cta' },
      { label: 'Dúvidas Frequentes', href: '/imersao#faq' },
      { label: 'Data e Local', href: '/imersao#next-class' },
    ],
  },
  {
    label: 'Produtos Digitais',
    href: '/ebooks',
    comingSoon: true,
    children: [
      { label: 'Masterclass', href: '/masterclass' },
      { label: 'Ebooks', href: '/ebooks' },
    ],
  },
]

export const footerNav: NavChild[] = [
  { label: 'Atendimentos Individuais', href: '/atendimento' },
  { label: 'Mentoria & Assessoria', href: '/mentoria-e-assessoria' },
  { label: 'Matematizadores', href: '/matematizador' },
  { label: 'Imersão Despertar', href: '/imersao' },
]
