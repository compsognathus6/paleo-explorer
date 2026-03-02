import { fetchJson } from './fetchJson'

const BFF_BASE_URL = import.meta.env.VITE_BFF_BASE_URL ?? 'http://localhost:3001'

export function bffUrl(path: string) {
  return `${BFF_BASE_URL}${path}`
}

export async function getJson<T>(path: string) {
  return fetchJson<T>(bffUrl(path))
}
