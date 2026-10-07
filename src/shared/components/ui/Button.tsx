import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-rojo-500 text-white hover:bg-rojo-600',
  secondary: 'border-[1.5px] border-rojo-500 bg-beige-50 text-rojo-600 hover:bg-rojo-50',
  ghost: 'text-cafe-900 hover:bg-beige-100',
}

const SIZES: Record<Size, string> = { md: 'px-6 py-3', sm: 'px-4 py-2 text-sm' }

const buttonClass = (variant: Variant, size: Size, className = '') =>
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-[1.2] transition-colors
   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo-500
   disabled:cursor-not-allowed disabled:border-transparent disabled:bg-beige-200 disabled:text-cafe-500 ${SIZES[size]} ${VARIANTS[variant]} ${className}`

type Common = { variant?: Variant; size?: Size }

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ComponentProps<'button'> & Common) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: LinkProps & Common) {
  return <Link viewTransition className={buttonClass(variant, size, className)} {...props} />
}
