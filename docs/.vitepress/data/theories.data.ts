import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const file = fileURLToPath(new URL('../../../theories/registry.yaml', import.meta.url))
export interface Theory {
  id: string
  name: string
  summary: string
  status: string
  category: string
  recommendation: string
  page: string
}
export interface Registry { updated_at: string; theories: Theory[] }
export default {
  watch: [file],
  load(): Registry {
    const registry = parse(readFileSync(file, 'utf8'))
    return { updated_at: registry.updated_at, theories: registry.theories }
  }
}
export declare const data: Registry
