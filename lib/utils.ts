// Simplified cn utility function (combines classnames)
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
    .join(' ')
}

