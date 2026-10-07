/**
 * Ícono decorativo desde un archivo de `src/assets/icons`. Se pinta como máscara con el color
 * del texto (`currentColor`), así respeta el tema claro y el de Día de Muertos.
 */
export function Icon({ src, className = 'size-5' }: { src: string; className?: string }) {
  const mask = `url("${src}") center / contain no-repeat`
  return <span aria-hidden="true" className={`inline-block shrink-0 bg-current ${className}`} style={{ mask, WebkitMask: mask }} />
}
