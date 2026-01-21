import type { PortableTextComponents } from '@portabletext/react'

export const portableMarks: PortableTextComponents['marks'] = {
  bold: ({ children }) => <span className="font-bold">{children}</span>,
  medium: ({ children }) => <span className="font-medium">{children}</span>,
  semibold: ({ children }) => <span className="font-semibold">{children}</span>,
  extrabold: ({ children }) => <span className="font-extrabold">{children}</span>,
  accent: ({ children }) => <span className="text-accent">{children}</span>,
  primary: ({ children }) => <span className="text-primary">{children}</span>,
  secondary: ({ children }) => <span className="text-secondary">{children}</span>,
  tertiary: ({ children }) => <span className="text-tertiary">{children}</span>,
  navy: ({ children }) => <span className="text-navy">{children}</span>,
  cyan: ({ children }) => <span className="text-cyan">{children}</span>,
  coral: ({ children }) => <span className="text-coral">{children}</span>,
  white: ({ children }) => <span className="text-white">{children}</span>,
  'gradient-primary': ({ children }) => (
    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {children}
    </span>
  ),
}
