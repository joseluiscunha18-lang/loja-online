export function formatMZN(value: number): string {
  return new Intl.NumberFormat("pt-MZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
