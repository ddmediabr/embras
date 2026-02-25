import React from 'react'

export default function ProposalFinalCTA() {
	return (
		<section className="py-40 px-4 bg-(--color-bg) border-t border-(--color-border)">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-7xl font-(--font-heading) uppercase tracking-tighter text-white mb-12">
					Vamos elevar o seu <br />
					<span className="text-(--color-muted)">posicionamento?</span>
				</h2>

				<div className="flex flex-col md:flex-row items-center justify-center gap-6">
					<button className="w-full md:w-auto px-12 py-6 bg-white text-black font-(--font-heading) uppercase text-sm tracking-[0.2em] rounded-full hover:bg-(--color-muted) hover:text-white transition-all duration-300">
						Aprovar Projeto Agora
					</button>
					<button className="w-full md:w-auto px-12 py-6 border border-white/20 text-white font-(--font-heading) uppercase text-sm tracking-[0.2em] rounded-full hover:bg-white/5 transition-all duration-300">
						Agendar Reunião Final
					</button>
				</div>
				
				<p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-(--color-muted)">
					Tempo estimado de resposta: <span className="text-white">Imediato</span>
				</p>
			</div>
		</section>
	)
}
