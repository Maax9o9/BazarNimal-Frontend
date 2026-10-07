import type { BadgeTone } from '@shared/components/ui/Badge'
import { plural } from '@shared/utils/format'
import type { PetSort, PetSpecies, PetStatus } from '../domain/petTypes'

export const SPECIES_LABEL: Record<PetSpecies, string> = { dog: 'Perro', cat: 'Gato' }

export const PET_STATUS: Record<PetStatus, { label: string; tone: BadgeTone }> = {
  in_adoption: { label: 'Disponible', tone: 'success' },
  adopted: { label: 'Adoptado', tone: 'neutral' },
}

export const petAge = (years: number, months: number) =>
  [years && plural(years, 'año', 'años'), months && plural(months, 'mes', 'meses')].filter(Boolean).join(' ') ||
  'Menos de un mes'

export const SPECIES_FILTER: { value: PetSpecies | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'dog', label: 'Perros' },
  { value: 'cat', label: 'Gatos' },
]

export const STATUS_FILTER: { value: PetStatus | ''; label: string }[] = [
  { value: 'in_adoption', label: 'En adopción' },
  { value: 'adopted', label: 'Adoptados' },
  { value: '', label: 'Todos' },
]

export const SORT_OPTIONS: { value: PetSort; label: string }[] = [
  { value: '-created_at', label: 'Más recientes' },
  { value: 'created_at', label: 'Más antiguos' },
  { value: 'name', label: 'Nombre (A-Z)' },
  { value: '-name', label: 'Nombre (Z-A)' },
]
