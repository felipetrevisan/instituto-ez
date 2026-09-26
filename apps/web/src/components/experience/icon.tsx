import {
  Activity,
  Book,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  ChartColumn,
  Check,
  Clock,
  Coffee,
  Compass,
  FileText,
  Gift,
  Heart,
  Layers,
  type LucideProps,
  MapPin,
  MessageCircle,
  Mic,
  Scale,
  Shield,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  User,
  Users,
  Wind,
  Workflow,
} from 'lucide-react'

const icons = {
  activity: Activity,
  book: Book,
  'book-open': BookOpen,
  brain: Brain,
  building: Building2,
  calendar: Calendar,
  chart: ChartColumn,
  check: Check,
  clock: Clock,
  coffee: Coffee,
  compass: Compass,
  file: FileText,
  gift: Gift,
  heart: Heart,
  layers: Layers,
  map: MapPin,
  message: MessageCircle,
  mic: Mic,
  scale: Scale,
  shield: Shield,
  sparkles: Sparkles,
  sun: Sun,
  target: Target,
  trending: TrendingUp,
  user: User,
  users: Users,
  wind: Wind,
  workflow: Workflow,
}

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Sparkles
  return <Component aria-hidden strokeWidth={1.6} {...props} />
}
