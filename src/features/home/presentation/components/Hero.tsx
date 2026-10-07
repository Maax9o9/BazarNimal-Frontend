import { ButtonLink } from '@shared/components/ui/Button'
import heroImage from '@assets/images/hero-perro-gato.webp'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-4 py-12 lg:gap-16 lg:py-18 md:px-10 xl:px-20 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <p className="text-sm font-medium leading-[1.4] text-rojo-600">Adopción responsable · Tienda · Día de Muertos</p>
        <h1 className="font-display text-display font-semibold">Encuentra a tu nuevo mejor amigo</h1>
        <p className="text-body-l text-cafe-700">
          Perros y gatos esperan un hogar. Conócelos, solicita su adopción y nosotros te llamamos para conocerse.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/adopta">Adopta ahora</ButtonLink>
          <ButtonLink to="/tienda" variant="secondary">
            Ver la tienda
          </ButtonLink>
        </div>
      </div>
      {/* Imagen principal (arriba del pliegue): sin lazy loading y con prioridad alta. */}
      <img
        src={heroImage}
        alt="Un perro café abrazando a un gato atigrado sobre el pasto"
        width={1536}
        height={1151}
        fetchPriority="high"
        className="h-64 w-full max-w-[560px] rounded-[32px] object-cover sm:h-80 lg:h-[440px]"
      />
    </section>
  )
}
