export default function WhoWeAre() {
	return (
		<section className="py-36 px-8 md:px-12 bg-(--color-bg) border-t border-(--color-surface)">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
				<div className="aspect-3/4 bg-(--color-surface) border border-(--color-border) relative max-w-md mx-auto md:ml-0">
					<div className="absolute inset-0 bg-linear-to-t from-(--color-bg) via-transparent to-transparent opacity-40" />
					{/* Visual for portrait lighting placeholder */}
					<div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-(--color-accent)/5 to-transparent" />
					<div className="absolute bottom-12 left-12">
						<span className="text-[10px] uppercase tracking-[0.5em] text-(--color-muted)">
							Founder & Visionary
						</span>
						<h4 className="text-xl font-(--font-heading) uppercase tracking-widest mt-2">
							Eduardo Santos
						</h4>
					</div>
				</div>

				<div className="flex flex-col gap-12">
					<span className="pill items-start text-(--color-muted) uppercase mb-6 block w-fit">
						Our Essence
					</span>
					<h2 className="text-5xl md:text-7xl font-(--font-heading) uppercase leading-tight md:leading-[82px] tracking-tighter">
						Tradição em <br /> esculpir o <br />{' '}
						<span className="text-(--color-muted)">invisível.</span>
					</h2>
					<div className="flex flex-col gap-6 max-w-lg">
						<p className="">
							Com mais de uma década de experiência no mercado de
							alto padrão, a Embras transforma espaços através de
							um olhar técnico e artístico sobre a luz.
						</p>
						<p className="">
							Nossa missão é criar ambientes que não apenas
							funcionam, mas que emocionam e traduzem o estilo de
							vida exclusivo de nossos clientes.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
