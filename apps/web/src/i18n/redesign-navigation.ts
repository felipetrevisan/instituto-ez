import { createNavigation } from 'next-intl/navigation'
import { redesignRouting } from './redesign-routing'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(redesignRouting)
