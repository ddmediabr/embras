'use client'

import React from 'react'

export default function WhatYouGet() {
	return (
		<section className="py-24 px-4 bg-(--color-bg) border-y border-(--color-border)">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8">
						<div className="flex items-center gap-3">
							<span className="w-2 h-2 rounded-full bg-white animate-pulse" />
							<span className="text-[10px] uppercase tracking-[0.4em] text-(--color-accent)/60 font-medium">
								Imersão no Projeto
							</span>
						</div>
						
						<h2 className="text-3xl md:text-5xl font-(--font-heading) uppercase tracking-tight text-(--color-accent) leading-tight">
							Por que você está vendo esta <span className="text-(--color-muted)">prévia agora?</span>
						</h2>
						
						<div className="space-y-4">
							<p className="text-(--color-accent)/60 leading-relaxed font-light">
								Acreditamos que um orçamento deve ser mais do que números em uma planilha. Deve ser uma prova de conceito.
							</p>
							<p className="text-(--color-accent)/60 leading-relaxed font-light">
								Abaixo, você encontrará uma <span className="text-white font-normal underline underline-offset-4 decoration-white/20">versão real e funcional</span> do que estamos construindo. Este não é um layout estático; é o código vivo crescendo de acordo com a identidade da Embras.
							</p>
						</div>
					</div>

					<div className="bg-(--color-surface) p-8 md:p-12 rounded-3xl border border-(--color-border) relative overflow-hidden group">
						{/* Decorative glow */}
						<div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors" />
						
						<div className="relative z-10 space-y-10">
							<div className="space-y-2">
								<h3 className="text-xs uppercase tracking-[0.3em] text-white">Abordagem Consultiva</h3>
								<p className="text-sm text-(--color-muted) leading-relaxed">
									Não apenas executamos tarefas, desenhamos estratégias de autoridade que posicionam sua marca no topo do mercado.
								</p>
							</div>

							<div className="h-[1px] w-full bg-gradient-to-r from-transparent via-(--color-border) to-transparent" />

							<div className="space-y-2">
								<h3 className="text-xs uppercase tracking-[0.3em] text-white">Entrega de Valor</h3>
								<p className="text-sm text-(--color-muted) leading-relaxed">
									O que você vê abaixo é apenas o alicerce. O material completo expande para uma arquitetura de conversão completa.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Strategic Transition Block */}
				<div className="mt-24 pt-24 border-t border-(--color-border) flex flex-col items-center text-center">
					<div className="max-w-2xl space-y-8">
						<p className="text-(--color-accent)/40 text-sm md:text-base font-light leading-relaxed uppercase tracking-[0.2em]">
							Abaixo, convidamos você a entrar na atmosfera da nova linha boutique. <br />
							Uma experiência de luz, precisão e design.
						</p>
						
						<button 
							onClick={() => document.getElementById('project-preview')?.scrollIntoView({ behavior: 'smooth' })}
							className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-(--font-heading) uppercase text-[11px] tracking-[0.3em] rounded-full hover:scale-105 transition-all duration-500 overflow-hidden"
						>
							<span className="relative z-10 transition-colors group-hover:text-black">Explorar o Novo Conceito</span>
							<div className="relative z-10 w-2 h-2 rounded-full bg-black group-hover:bg-black transition-colors" />
							
							{/* Subtle shine effect on hover */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
