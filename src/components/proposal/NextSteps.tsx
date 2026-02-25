import React from 'react'

export default function NextSteps() {
	const steps = [
		{
			id: '01',
			title: 'Aprovação',
			description: 'Formalizamos o aceite da proposta e alinhamos os acessos necessários.'
		},
		{
			id: '02',
			title: 'Ajustes Finais',
			description: 'Refinamos os detalhes do design e estrutura de acordo com seu feedback.'
		},
		{
			id: '03',
			title: 'Execução',
			description: 'Iniciamos o desenvolvimento full-stack com entregas parciais monitoradas.'
		}
	]

	return (
		<section className="py-24 px-4 bg-(--color-surface)">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
					<div className="max-w-xl">
						<span className="text-[10px] uppercase tracking-[0.5em] text-(--color-accent)/40 mb-4 block">
							Fluxo de Trabalho
						</span>
						<h2 className="text-4xl md:text-5xl font-(--font-heading) uppercase tracking-[0.1em] text-(--color-accent)">
							Próximos <span className="text-(--color-muted)">Passos</span>
						</h2>
					</div>
					<div className="hidden md:block h-[1px] flex-1 bg-(--color-border) ml-12 mb-4" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-(--color-border) border border-(--color-border) rounded-2xl overflow-hidden">
					{steps.map((step) => (
						<div key={step.id} className="bg-(--color-surface) p-10 md:p-12 group transition-colors hover:bg-white/[0.02]">
							<span className="text-sm font-(--font-heading) text-(--color-muted) mb-8 block group-hover:text-white transition-colors">
								{step.id}.
							</span>
							<h3 className="text-xl font-(--font-heading) uppercase tracking-widest text-white mb-4">
								{step.title}
							</h3>
							<p className="text-sm text-(--color-accent)/40 leading-relaxed font-light">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
