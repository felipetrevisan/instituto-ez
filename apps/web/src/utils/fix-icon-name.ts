const ICON_FIX_MAP: Record<string, string> = {
  building2: 'building-2',
  'bar-chart2': 'bar-chart-2',
  'bar-chart3': 'bar-chart-3',
  'bar-chart4': 'bar-chart-4',
  'check-circle2': 'check-circle-2',
}

export function fixIconName(iconName: string): string {
  const normalized = iconName.trim().toLowerCase()
  return ICON_FIX_MAP[normalized] ?? iconName
}
