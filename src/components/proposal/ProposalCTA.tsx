import React from 'react'

export default function ProposalCTA() {
	return (
		<section className="py-32 px-4 bg-(--color-bg) relative overflow-hidden">
			{/* Decorative lines */}
			<div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-(--color-border) to-transparent opacity-50" />
			<div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-(--color-border) to-transparent opacity-50" />

			<div className="max-w-4xl mx-auto text-center relative z-10">
				<span className="text-[10px] uppercase tracking-[0.5em] text-(--color-accent)/40 mb-6 block">
					Material de Apoio
				</span>
				
				<h2 className="text-3xl md:text-6xl font-(--font-heading) uppercase tracking-tight text-(--color-accent) mb-8">
					Acesse o Escopo <br />
					<span className="text-(--color-muted)">Detalhado no Figma</span>
				</h2>

				<p className="text-(--color-accent)/50 text-base md:text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
					Preparamos um material completo com o escopo técnico, cronogramas de entrega, arquitetura de informação e detalhes do investimento.
				</p>

				<a 
					href="#" 
					target="_blank" 
					rel="noopener noreferrer"
					className="group relative inline-flex items-center gap-6 px-12 py-6 bg-white text-black font-(--font-heading) uppercase text-sm tracking-[0.2em] rounded-full hover:bg-black hover:text-white transition-all duration-500 overflow-hidden"
				>
					<span className="relative z-10">Explorar Projeto Completo</span>
					<svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
					<div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors" />
				</a>

				<div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6">
					{['Escopo Técnico', 'Cronograma', 'Entregáveis', 'Investimento'].map((item) => (
						<div key={item} className="flex items-center gap-2">
							<div className="w-1 h-1 rounded-full bg-white opacity-20" />
							<span className="text-[10px] uppercase tracking-widest text-(--color-muted)">{item}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
