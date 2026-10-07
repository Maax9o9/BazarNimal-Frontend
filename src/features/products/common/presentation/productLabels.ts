import type { BadgeTone } from '@shared/components/ui/Badge'
import { plural } from '@shared/utils/format'
import type { ProductStatus } from '../domain/productTypes'

export const PRODUCT_STATUS: Record<ProductStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Disponible', tone: 'success' },
  unavailable: { label: 'Agotado', tone: 'neutral' },
}

export const weightLabel = (kg: number | null) => (kg === null ? '—' : `${kg} kg`)
export const piecesLabel = (pieces: number | null) => (pieces === null ? '—' : plural(pieces, 'pieza', 'piezas'))

/** "4 kg", "12 piezas" o "0.5 kg · 20 piezas". */
export const productMeasure = (kg: number | null, pieces: number | null) =>
  [kg !== null && weightLabel(kg), pieces !== null && piecesLabel(pieces)].filter(Boolean).join(' · ')
