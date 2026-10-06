import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-rojo-500 text-white hover:bg-rojo-600',
  secondary: 'border-[1.5px] border-rojo-500 bg-beige-50 text-rojo-600 hover:bg-rojo-50',
  ghost: 'text-cafe-900 hover:bg-beige-100',
}

const buttonClass = (variant: Variant, className = '') =>
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold leading-[1.2] transition-colors
   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo-500
   disabled:cursor-not-allowed disabled:border-transparent disabled:bg-beige-200 disabled:text-cafe-500 ${VARIANTS[variant]} ${className}`

type ButtonProps = ComponentProps<'button'> & { variant?: Variant }

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />
}

type ButtonLinkProps = LinkProps & { variant?: Variant }

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />
}
