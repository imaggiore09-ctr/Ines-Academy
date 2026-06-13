const ICONS: Record<string, string> = {
  dashboard: 'M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-16v5h7V4h-7Z',
  roadmap:   'M9 6 4 8v10l5-2 6 2 5-2V6l-5 2-6-2Zm0 0v10m6-8v10',
  identity:  'M20 5 9 16l-4-4m15-7-7 13',
  social:    'M18 8a3 3 0 1 0-2.8-4M18 8a3 3 0 0 1-2.8 4M6 12a3 3 0 1 0 0 0Zm9.2-8L8.8 8m0 4 6.4 4',
  obras:     'M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5M15 9h.01',
  shop:      'M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0',
  legal:     'M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0L7 7Zm10 0-3 7a3 3 0 0 0 6 0l-3-7Z',
  learn:     'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm15 14H6',
  calendar:  'M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Zm0 4h16M8 3v4m8-4v4',
  list:      'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  grid:      'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  plus:      'M12 5v14M5 12h14',
  check:     'M5 12l5 5L20 6',
  chevron:   'M9 6l6 6-6 6',
  chevronD:  'M6 9l6 6 6-6',
  x:         'M6 6l12 12M18 6 6 18',
  search:    'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-5-5',
  bell:      'M6 9a6 6 0 0 1 12 0c0 7 2 8 2 8H4s2-1 2-8m4 12a2 2 0 0 0 4 0',
  phone:     'M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  box:       'M4 8 12 4l8 4-8 4-8-4Zm0 0v8l8 4 8-4V8M12 12v8',
  heart:     'M12 20S4 15 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z',
  edit:      'M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4',
  trash:     'M5 7h14M9 7V5h6v2m-7 0 1 13h6l1-13',
  clock:     'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2',
  arrow:     'M5 12h14m-6-6 6 6-6 6',
  sparkle:   'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z',
  menu:      'M4 7h16M4 12h16M4 17h16',
  settings:  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 0-.2-1.6l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2.8-1.6L14 2h-4l-.7 2.3A8 8 0 0 0 6.5 6L4.2 5l-2 3.4 2 1.5A8 8 0 0 0 4 12c0 .5 0 1 .2 1.6l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2.8 1.6L10 22h4l.7-2.3a8 8 0 0 0 2.8-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1 .2-1.6Z',
  target:    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  trending:  'M4 16l5-5 4 4 7-8m0 0h-5m5 0v5',
  mail:      'M3 6h18v12H3zM3 7l9 6 9-6',
  palette:   'M12 3a9 9 0 1 0 0 18c1 0 2-1 2-2 0-2 2-2 3-2a4 4 0 0 0 4-4c0-5-4-8-9-8Zm-4 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  star:      'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z',
  flag:      'M5 21V4m0 0 9-1 5 2v9l-5-2-9 1',
  eye:       'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  doc:       'M6 3h8l4 4v14H6zM14 3v4h4',
  user:      'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  info:      'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-9v4.5m0-8h.01',
  shield:    'M12 3l7 2.5v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V5.5L12 3Z',
  book:      'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm15 14H6',
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 18, className, style }: IconProps) {
  const d = ICONS[name] ?? ICONS.dashboard;
  return (
    <svg
      className={'ico ' + (className ?? '')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
