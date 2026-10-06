export function StoreBanner() {
  return (
    <section id="tienda" aria-labelledby="tienda-titulo" className="mx-auto max-w-[1440px] scroll-mt-4 px-4 pb-18 md:px-20">
      <div className="flex flex-col gap-3 rounded-[32px] bg-beige-100 px-8 py-12 md:px-14">
        <h2 id="tienda-titulo" className="font-display text-h1 font-semibold">
          Todo para tu compañero
        </h2>
        <p className="max-w-[560px] text-body-l text-cafe-700">
          Alimento, juguetes y accesorios. Consulta la existencia en línea y visítanos en tienda.
        </p>
      </div>
    </section>
  )
}
