export function isString(n: any): boolean {
  return typeof n === 'string';
}

export function isInt(n: number): boolean {
  return n % 1 === 0;
}

export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}
