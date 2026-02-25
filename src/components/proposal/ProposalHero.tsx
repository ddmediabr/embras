import React from 'react'

export default function ProposalHero() {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 bg-(--color-bg) overflow-hidden">
			{/* Decorative Elements */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-(--color-accent) opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
			
			<div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
				<div className="flex items-center gap-4 mb-8 animate-fade-in">
					<span className="h-[1px] w-8 bg-(--color-accent) opacity-40" />
					<span className="text-[10px] uppercase tracking-[0.5em] text-(--color-accent)/60">
						Apresentação Estratégica
					</span>
					<span className="h-[1px] w-8 bg-(--color-accent) opacity-40" />
				</div>

				<h1 className="text-4xl md:text-7xl font-(--font-heading) uppercase tracking-tighter text-center text-(--color-accent) leading-[1.1] mb-8 max-w-4xl">
					A sua visão, traduzida em <br />
					<span className="text-(--color-muted) opacity-80">experiência digital de elite</span>
				</h1>

				<p className="text-sm md:text-lg text-(--color-accent)/40 uppercase tracking-[0.3em] text-center max-w-2xl mb-16 leading-relaxed">
					Este não é apenas um orçamento. É o primeiro passo da evolução da sua marca no ambiente digital.
				</p>

				{/* VSL Container */}
				<div className="relative w-full aspect-video max-w-4xl bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden shadow-2xl group transition-all hover:border-(--color-accent)/20">
					{/* Placeholder for Video */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-20 h-20 rounded-full bg-(--color-accent)/5 flex items-center justify-center border border-(--color-accent)/10 group-hover:scale-110 transition-transform cursor-pointer">
							<svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-(--color-bg) to-transparent opacity-40" />
					
					{/* Video Text Overlay (Optional) */}
					<div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
						<span className="text-[10px] text-(--color-accent)/40 tracking-widest uppercase">Reproduzir Apresentação</span>
						<span className="text-[10px] text-(--color-accent)/40 tracking-widest uppercase">04:20</span>
					</div>
				</div>
			</div>
			
			{/* Bottom Transition */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-(--color-bg) to-transparent z-10" />
		</section>
	)
}
