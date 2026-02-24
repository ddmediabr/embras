import Image from 'next/image'

export default function SuccessCases() {
	const cases = [
		{
			id: 1,
			title: 'Mansão Alpha',
			location: 'São Paulo',
			span: 'md:col-span-7',
			aspect: 'aspect-square',
			image: '/images/case-1.png',
		},
		{
			id: 2,
			title: 'Fazenda Aurora',
			location: 'Minas Gerais',
			span: 'md:col-span-5',
			aspect: 'aspect-[4/5]',
			image: '/images/hero.png',
		},
		{
			id: 3,
			title: 'Apartamento Garden',
			location: 'Rio de Janeiro',
			span: 'md:col-span-5',
			aspect: 'aspect-[4/5]',
			image: '/images/case-1.png',
		},
		{
			id: 4,
			title: 'Residência Moderna',
			location: 'Curitiba',
			span: 'md:col-span-7',
			aspect: 'aspect-video',
			image: '/images/hero.png',
		},
	]

	return (
		<section className="py-64 px-8 md:px-12 max-w-7xl mx-auto bg-(--color-bg)">
			<div className="mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
				<div>
					<span className="text-(--color-muted) uppercase tracking-[0.4em] text-xs mb-6 block italic">
						Portfolio Selected
					</span>
					<h2 className="text-5xl md:text-7xl font-(--font-heading) uppercase leading-[0.9] tracking-tighter">
						Onde a luz <br />
						encontra a <br />
						<span className="text-(--color-muted)">
							arquitetura
						</span>
					</h2>
				</div>
				<div className="max-w-md">
					<p className="text-(--color-muted) leading-relaxed">
						Nossos projetos são intervenções artísticas que
						valorizam cada volume, material e textura do ambiente
						construído.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
				{cases.map((project, index) => (
					<div
						key={project.id}
						className={`${project.span} ${index === 2 ? 'md:-mt-32' : ''} group cursor-pointer`}
					>
						<div
							className={`${project.aspect} bg-(--color-surface) border border-(--color-border) relative overflow-hidden transition-all duration-700 group-hover:border-(--color-accent)/30`}
						>
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
							/>

							<div className="absolute inset-0 bg-gradient-to-br from-transparent via-(--color-accent)/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

							<div className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.5em] text-(--color-accent) z-10 flex items-center gap-4">
								<span className="w-8 h-[1px] bg-(--color-accent)/50" />
								{project.location}
							</div>
						</div>
						<div className="mt-6">
							<h3 className="text-xl font-(--font-heading) uppercase tracking-widest group-hover:text-(--color-muted) transition-colors">
								{project.title}
							</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
