import { ButtonLink } from '@shared/components/ui/Button'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-4 py-18 md:px-20 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <p className="text-sm font-medium leading-[1.4] text-rojo-600">Adopción responsable · Tienda · Día de Muertos</p>
        <h1 className="font-display text-display font-semibold">Encuentra a tu nuevo mejor amigo</h1>
        <p className="text-body-l text-cafe-700">
          Perros y gatos esperan un hogar. Conócelos, solicita su adopción y nosotros te llamamos para conocerse.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/#adopta">Adopta ahora</ButtonLink>
          <ButtonLink to="/#tienda" variant="secondary">
            Ver la tienda
          </ButtonLink>
        </div>
      </div>
      <ImageWithFallback src={null} alt="Perros y gatos del refugio" className="h-[440px] w-full max-w-[560px] rounded-[32px]" />
    </section>
  )
}
