export function formatEventDate(
  date: Date,
  endDate?: Date,
  locale = 'ja-JP'
): string {
  const start = date.toLocaleDateString(locale);
  if (!endDate) return start;
  const end = endDate.toLocaleDateString(locale);
  return `${start} – ${end}`;
}

export function isUpcoming(date: Date, endDate?: Date): boolean {
  const now = new Date();
  const d = endDate ?? date;
  // “今日中”はUpcoming扱いにしたければ >= にしてOK
  return d.getTime() >= now.getTime();
}

export const EVENT_TYPE_LABEL: Record<string, string> = {
  zine: 'ZINE',
  online: 'ONLINE',
  release: 'RELEASE',
  talk: 'TALK',
  other: 'EVENT',
};
