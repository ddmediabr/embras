'use client'

import React, { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const testimonials = [
	{
		id: 1,
		quote: 'Exceptional experience from start to finish. The team was highly communicative and took the time to truly grasp our vision. Their creative direction was spot-on, delivering a final product that exceeded our expectations.',
	},
	{
		id: 2,
		quote: 'Professional, reliable, and incredibly talented. The team not only understood our needs but also provided innovative designs that perfectly aligned with our brand identity. Highly recommended!',
	},
	{
		id: 3,
		quote: 'Working with this team was a seamless experience from start to finish. They took our vision and transformed it into a stunning, functional space that exceeded our expectations.',
	},
	{
		id: 4,
		quote: 'The attention to detail and dedication to finding the perfect lighting solutions for our space were unparalleled. An absolute joy to collaborate with from day one.',
	},
]

export default function TestimonialsSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const lineHRef = useRef<HTMLDivElement>(null)
	const lineVRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLDivElement>(null)
	const quoteIconRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const dotsRefs = useRef<(HTMLDivElement | null)[]>([])
	const textRefs = useRef<(HTMLParagraphElement | null)[]>([])

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (!mounted || !sectionRef.current || !trackRef.current) return

			const total = testimonials.length
			// Cada slide ocupa exatamente 1/3 da viewport em altura
			const itemH = window.innerHeight / 3

			// ==============================
			// ESTADOS INICIAIS
			// ==============================
			gsap.set(lineHRef.current, {
				scaleX: 0,
				transformOrigin: 'left center',
			})
			gsap.set(lineVRef.current, {
				scaleY: 0,
				transformOrigin: 'center top',
			})
			gsap.set(titleRef.current, { opacity: 0.4 })
			gsap.set(quoteIconRef.current, { opacity: 0.4 })

			// Todos os textos começam cinza
			textRefs.current.forEach((el) => {
				if (el) gsap.set(el, { color: '#474747' })
			})

			// Todos os dots escondidos
			dotsRefs.current.forEach((el) => {
				if (el) gsap.set(el, { opacity: 0 })
			})

			// Paginação: primeiro ativo
			testimonials.forEach((_, i) => {
				gsap.set(`.pagination-line-${i}`, {
					backgroundColor: i === 0 ? '#ffffff' : '#474747',
				})
			})

			// ==============================
			// 1. ANIMAÇÃO DE ENTRADA (sem scrub)
			// ==============================
			const entranceTl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					// start em 'top 30%' fica ANTES do pin (top top).
					// Isso garante que o snap do carrossel (que snapa para top top)
					// nunca cruza de volta o gatilho de entrada — logo o reverse
					// só acontece quando o usuário scrolla de verdade para fora da seção.
					start: 'top 30%',
					toggleActions: 'play none none reverse',
				},
			})

			entranceTl
				.to(
					lineHRef.current,
					{ scaleX: 1, duration: 1.2, ease: 'power3.out' },
					0
				)
				.to(
					lineVRef.current,
					{ scaleY: 1, duration: 1.2, ease: 'power3.out' },
					0
				)
				.to(
					titleRef.current,
					{ opacity: 1, duration: 1, ease: 'power2.out' },
					0.3
				)
				.to(
					quoteIconRef.current,
					{ opacity: 1, duration: 1, ease: 'power2.out' },
					0.3
				)

			// Primeiro item: cor branca e dots visíveis
			if (textRefs.current[0]) {
				entranceTl.to(
					textRefs.current[0],
					{ color: '#ffffff', duration: 1, ease: 'power2.out' },
					0.4
				)
			}
			if (dotsRefs.current[0]) {
				entranceTl.to(
					dotsRefs.current[0],
					{ opacity: 1, duration: 0.8, ease: 'power2.out' },
					0.4
				)
			}

			// ==============================
			// 2. CAROUSEL COM SCRUB + SNAP
			// ==============================
			// A seção é pinada. O scroll controla a posição do track.
			// snap: trava em cada slide quando o scroll desacelera.
			// holdFraction: a fração inicial da timeline onde NADA move.
			// Isso garante que o item 0 fique visível quando a seção pinar
			// antes dos slides começarem a mover.
			const holdFraction = 0.05

			const scrollTl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					// Adicionamos uma viewport extra para o hold period
					end: `+=${total * window.innerHeight}`,
					pin: true,
					scrub: 0.5,
					snap: {
						// Os snap points foram ajustados para incluir o hold no início
						snapTo: (value: number) => {
							// Snap para 0 (hold) ou para cada slide transition
							const points = [0]
							for (let i = 1; i < total; i++) {
								points.push(
									holdFraction +
										(i / (total - 1)) * (1 - holdFraction)
								)
							}
							return points.reduce((a, b) =>
								Math.abs(b - value) < Math.abs(a - value)
									? b
									: a
							)
						},
						duration: { min: 0.1, max: 0.2 },
						ease: 'power1.inOut',
					},
				},
			})

			// Hold period: o item 0 fica estático no início
			scrollTl.to({}, { duration: holdFraction })

			for (let i = 1; i < total; i++) {
				// stepStart e dur mapeados para o range [holdFraction, 1]
				const stepStart =
					holdFraction + ((i - 1) / (total - 1)) * (1 - holdFraction)
				const dur = (1 / (total - 1)) * (1 - holdFraction)

				// Move o track para cima por exatamente 1 item height (em pixels)
				scrollTl.to(
					trackRef.current,
					{ y: -i * itemH, ease: 'none', duration: dur },
					stepStart
				)

				// Desativa o item anterior: cinza + esconde dots
				if (textRefs.current[i - 1]) {
					scrollTl.to(
						textRefs.current[i - 1]!,
						{ color: '#474747', ease: 'none', duration: dur },
						stepStart
					)
				}
				if (dotsRefs.current[i - 1]) {
					scrollTl.to(
						dotsRefs.current[i - 1]!,
						{ opacity: 0, ease: 'none', duration: dur * 0.4 },
						stepStart
					)
				}

				// Ativa o novo item: branco + mostra dots
				if (textRefs.current[i]) {
					scrollTl.to(
						textRefs.current[i]!,
						{ color: '#ffffff', ease: 'none', duration: dur },
						stepStart
					)
				}
				if (dotsRefs.current[i]) {
					scrollTl.to(
						dotsRefs.current[i]!,
						{ opacity: 1, ease: 'none', duration: dur * 0.4 },
						stepStart + dur * 0.5
					)
				}

				// Paginação
				scrollTl.to(
					`.pagination-line-${i - 1}`,
					{
						backgroundColor: '#474747',
						ease: 'none',
						duration: dur * 0.5,
					},
					stepStart
				)
				scrollTl.to(
					`.pagination-line-${i}`,
					{
						backgroundColor: '#ffffff',
						ease: 'none',
						duration: dur * 0.5,
					},
					stepStart + dur * 0.3
				)
			}

			return () => {
				ScrollTrigger.getAll().forEach((t) => t.kill())
			}
		},
		{ scope: sectionRef, dependencies: [mounted] }
	)

	return (
		<section
			ref={sectionRef}
			className="h-screen w-full bg-[#050505] relative overflow-hidden flex flex-row"
		>
			{/* ====== LINHAS DECORATIVAS (#474747) ====== */}
			<div
				ref={lineHRef}
				className="absolute top-[12%] left-0 w-[12%] h-px bg-[#474747] z-10"
			/>
			<div
				ref={lineVRef}
				className="absolute top-0 left-[20%] w-px h-[10%] bg-[#474747] z-10"
			/>

			{/* ====== COLUNA ESQUERDA (20%) ====== */}
			<div className="w-[20%] h-full relative flex flex-col">
				{/* Feedback: abaixo da linha horizontal */}
				<div
					ref={titleRef}
					className="absolute top-[12%] left-6 lg:left-12 mt-16 flex items-center gap-3 text-white text-xs md:text-[2.5rem] font-bold tracking-[0.1em] uppercase leading-[1.5] z-20"
				>
					O que dizem de nós
				</div>

				{/* Ícone aspas: centralizado verticalmente */}
				<div
					ref={quoteIconRef}
					className="w-full h-full flex items-center justify-center pl-6 lg:pl-12"
				>
					<svg
						className="w-20 h-20 md:w-28 md:h-28 xl:w-40 xl:h-40 text-white"
						viewBox="0 0 100 100"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M42.5 35.5h-15l-10 30h15v15h20v-30h-15l5-15h-5zm45 0h-15l-10 30h15v15h20v-30h-15l5-15h-5z" />
					</svg>
				</div>
			</div>

			{/* ====== COLUNA DIREITA (80%) ====== */}
			<div className="w-[80%] h-full relative flex items-center">
				{/* Paginação */}
				<div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
					{testimonials.map((t, idx) => (
						<div
							key={`pag-${t.id}`}
							className={`pagination-line-${idx} w-px h-6`}
							style={{
								backgroundColor:
									idx === 0 ? '#ffffff' : '#474747',
							}}
						/>
					))}
				</div>

				{/* ====== JANELA DO CAROUSEL ====== */}
				{/*
					Lógica do layout:
					- A janela ocupa 100vh (toda a seção)
					- Cada slide ocupa 33.33vh (1/3 da viewport)
					- O track começa posicionado em top: 33.33vh,
					  para que o PRIMEIRO item fique no CENTRO vertical da tela
					- Ao scrollar, o GSAP move o track para cima por 33.33vh por step
					- Isso faz o próximo item ocupar o centro
					- O item anterior fica visível acima (1/3 superior)
					- O próximo fica visível abaixo (1/3 inferior)
					→ Resultado: 3 itens visíveis (anterior + ativo + próximo)
				*/}
				<div className="relative w-full h-full overflow-hidden">
					<div
						ref={trackRef}
						className="absolute left-16 md:left-28 right-20 md:right-80 max-w-[900px] will-change-transform"
						style={{ top: '33.33vh' }}
					>
						{testimonials.map((t, idx) => (
							<div
								key={`test-${t.id}`}
								className="flex flex-col justify-center"
								style={{ height: '33.33vh' }}
							>
								{/* Dots vermelhos: controlados por GSAP (opacity) */}
								<div
									ref={(el) => {
										dotsRefs.current[idx] = el
									}}
									className="flex gap-[6px] mb-5"
									style={{ opacity: 0 }}
								>
									<div className="w-2.5 h-2.5 rounded-full bg-white" />
									<div className="w-2.5 h-2.5 rounded-full bg-white" />
								</div>

								{/* Texto do depoimento: cor controlada por GSAP inline */}
								<p
									ref={(el) => {
										textRefs.current[idx] = el
									}}
									className="text-lg md:text-2xl lg:text-[32px] leading-[1.2] md:leading-[1.15] tracking-tight font-medium"
									style={{ color: '#474747' }}
								>
									{t.quote}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
