/** Pick legible label color on top of a solid hex background. */
export function contrastTextOn(hex: string): '#FFFFFF' | '#171717' {
  const h = hex.replace('#', '');
  if (h.length !== 6) return '#171717';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? '#171717' : '#FFFFFF';
}
