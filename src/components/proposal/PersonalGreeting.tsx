import React from 'react'

export default function PersonalGreeting() {
	return (
		<section className="pt-40 pb-20 px-4 bg-(--color-bg) border-b border-(--color-border) relative overflow-hidden">
			{/* Subtle background texture or light leak */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
			
			<div className="max-w-5xl mx-auto relative z-10">
				<div className="flex items-center gap-4 mb-12 animate-fade-in">
					<span className="text-[10px] uppercase tracking-[0.5em] text-(--color-accent)/40">
						Apresentação Exclusiva
					</span>
					<div className="h-[1px] w-12 bg-gradient-to-r from-(--color-accent)/40 to-transparent" />
				</div>

				<div className="space-y-12">
					<h1 className="text-3xl md:text-5xl font-(--font-heading) text-white leading-tight max-w-3xl">
						Olá, <span className="italic">Andrea</span>. <br />
						É um prazer para a <span className="text-(--color-muted)">DD Media</span> apresentar esta proposta para a nova fase da Embras.
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
						<div className="space-y-6">
							<p className="text-(--color-accent)/60 leading-relaxed font-light text-lg">
								A Embras está cruzando o portal para um novo posicionamento. Esta apresentação foi arquitetada especificamente para materializar a visão da sua nova <span className="text-white font-normal">Linha Boutique Premium</span>.
							</p>
						</div>
						<div className="space-y-6">
							<p className="text-(--color-accent)/60 leading-relaxed font-light text-lg">
								Nosso compromisso foi honrar a essência técnica e a autoridade que a marca já possui, elevando-a a um nível de percepção onde o design e a tecnologia se fundem em sofisticação pura.
							</p>
						</div>
					</div>
				</div>

				{/* Scrolling Indicator for continuity */}
				<div className="mt-24 flex items-center gap-3 opacity-30 group">
					<span className="text-[9px] uppercase tracking-[0.3em] text-white">Role para iniciar a experiência</span>
					<div className="w-10 h-[1px] bg-white origin-left group-hover:scale-x-125 transition-transform duration-700" />
				</div>
			</div>
		</section>
	)
}
