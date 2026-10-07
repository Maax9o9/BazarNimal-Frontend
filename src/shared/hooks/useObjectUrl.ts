import { useEffect, useMemo } from 'react'

/** Vista previa local de un archivo; la URL se libera al cambiar de archivo o desmontar. */
export function useObjectUrl(file: File | null): string | null {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url])
  return url
}
