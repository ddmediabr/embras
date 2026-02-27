'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export default function SuccessCases() {
	const sectionRef = useRef<HTMLElement>(null)
	const gridRef = useRef<HTMLDivElement>(null)
	const logoRef = useRef<HTMLDivElement>(null)
	const lineHRef = useRef<HTMLDivElement>(null)
	const lineVRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const cases = [
		{
			id: 1,
			title: 'Mansão Alpha',
			location: 'São Paulo',
			image: '/images/case-1.png',
		},
		{
			id: 2,
			title: 'Fazenda Aurora',
			location: 'Minas Gerais',
			image: '/images/hero.png',
		},
		{
			id: 3,
			title: 'Apartamento Garden',
			location: 'Rio de Janeiro',
			image: '/images/case-1.png',
		},
		{
			id: 4,
			title: 'Residência Moderna',
			location: 'Curitiba',
			image: '/images/hero.png',
		},
	]

	useGSAP(
		() => {
			if (!mounted) return

			const grid = gridRef.current
			const lineH = lineHRef.current
			const lineV = lineVRef.current
			const logo = logoRef.current
			const cards = cardsRef.current

			if (!grid || !lineH || !lineV || !logo) return

			// Gap do grid: gap-4 (mobile 16px → offset 8px) | gap-24 (desktop 96px → offset 48px)
			const isMobile = window.innerWidth < 768
			const offset = isMobile ? 8 : 48

			// ─────────────────────────────────────────────────────────────
			// TIMELINE 1:  Cards se separam + Linhas se expandem
			//
			// Trigger: gridRef
			// START 'top bottom':   topo do grid cruza o rodapé da viewport
			//   → cards ainda colados, linhas invisíveis
			// END 'center center':  centro do grid chega ao centro da viewport
			//   → ponto exato onde a linha horizontal divisória fica visível
			//   → cards no lugar, linhas 100% expandidas
			// ─────────────────────────────────────────────────────────────
			// transformOrigin deve ser definido via GSAP (não CSS) porque o GSAP
			// sobrescreve CSS transforms com seu próprio sistema.
			// 'center center' = expande para ambos os lados a partir do centro.
			// Isso não conflita com scrub pois transformOrigin não é propriedade animada.
			gsap.set(lineH, { transformOrigin: '50% 50%' })
			gsap.set(lineV, { transformOrigin: '50% 50%' })

			const tlGrid = gsap.timeline({
				scrollTrigger: {
					trigger: grid,
					start: 'top bottom', // cards colados ao entrar
					end: 'top 35%', // linhas completas quando 1ª linha está completamente visível
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			})

			tlGrid.fromTo(
				cards[0],
				{ x: offset, y: offset },
				{ x: 0, y: 0, ease: 'none' },
				0
			)
			tlGrid.fromTo(
				cards[1],
				{ x: -offset, y: offset },
				{ x: 0, y: 0, ease: 'none' },
				0
			)
			tlGrid.fromTo(
				cards[2],
				{ x: offset, y: -offset },
				{ x: 0, y: 0, ease: 'none' },
				0
			)
			tlGrid.fromTo(
				cards[3],
				{ x: -offset, y: -offset },
				{ x: 0, y: 0, ease: 'none' },
				0
			)

			// Linha horizontal expande do centro | Vertical expande do centro
			tlGrid.fromTo(
				lineH,
				{ scaleX: 0, opacity: 0 },
				{ scaleX: 1, opacity: 1, ease: 'none' },
				0
			)
			tlGrid.fromTo(
				lineV,
				{ scaleY: 0, opacity: 0 },
				{ scaleY: 1, opacity: 1, ease: 'none' },
				0
			)

			// ─────────────────────────────────────────────────────────────
			// TIMELINE 2:  Logo aparece
			//
			// START 'center center': mesmo END do ST1 (linhas já completas)
			// END   'bottom 20%':    logo completo com 80% do grid visível
			// ─────────────────────────────────────────────────────────────
			const tlLogo = gsap.timeline({
				scrollTrigger: {
					trigger: grid,
					start: 'top 35%', // mesmo END do ST1 — linhas já completas
					end: 'bottom 95%', // logo completo quando fundo do grid cruza 60% da viewport
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			})

			tlLogo.fromTo(
				logo,
				{ opacity: 0, scale: 0.85 },
				{ opacity: 1, scale: 1, ease: 'power2.out' }
			)

			return () => {
				ScrollTrigger.getAll().forEach((t) => t.kill())
			}
		},
		{ scope: sectionRef, dependencies: [mounted] }
	)

	return (
		<section
			ref={sectionRef}
			className="py-36 px-8 md:px-12 max-w-7xl mx-auto bg-(--color-bg) overflow-hidden"
		>
			{/* HEADER */}
			<div className="mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
				<div>
					<span className="pill items-start text-(--color-muted) uppercase mb-8 block w-fit">
						Cases de sucesso
					</span>
					<h2 className="text-5xl md:text-7xl font-(--font-heading) uppercase leading-tight md:leading-[82px] tracking-tighter">
						Onde a luz <br />
						encontra a <br />
						<span className="text-(--color-muted)">
							arquitetura
						</span>
					</h2>
				</div>
				<div className="max-w-md">
					<p>
						Nossos projetos são intervenções artísticas que
						valorizam cada volume, material e textura do ambiente
						construído.
					</p>
				</div>
			</div>

			{/* GRID CONTAINER */}
			<div ref={gridRef} className="relative">
				{/* LINHA HORIZONTAL — inicial invisible via CSS */}
				<div
					ref={lineHRef}
					className="absolute top-1/2 left-0 w-full h-px z-5 pointer-events-none"
					style={{
						backgroundColor: '#474747',
						transformOrigin: 'center',
						transform: 'scaleX(0)',
						opacity: 0,
					}}
				/>

				{/* LINHA VERTICAL — expande do centro */}
				<div
					ref={lineVRef}
					className="absolute left-1/2 top-0 w-px h-full z-5 pointer-events-none"
					style={{
						backgroundColor: '#474747',
						transformOrigin: 'center',
						transform: 'scaleY(0)',
						opacity: 0,
					}}
				/>

				{/* LOGO CENTRAL — inicial invisible via CSS */}
				<div
					ref={logoRef}
					className="absolute top-1/2 left-1/2 z-10 pointer-events-none"
					style={{
						opacity: 0,
						transform: 'translate(-50%, -50%) scale(0.85)',
					}}
				>
					<div className="w-[60px] h-[60px] relative bg-[#050505] rounded-full flex items-center justify-center p-2">
						<div className="w-full h-full relative">
							<Image
								src="/images/embras-form-w.png"
								alt="Embras"
								fill
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				{/* CARDS */}
				<div className="grid grid-cols-2 gap-4 md:gap-24 relative z-20">
					{cases.map((project, index) => (
						<div
							key={project.id}
							ref={(el) => {
								cardsRef.current[index] = el
							}}
							className="group cursor-pointer"
						>
							<div className="aspect-square bg-(--color-surface) border border-(--color-border) relative overflow-hidden transition-all duration-700 group-hover:border-(--color-accent)/30">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
								/>

								{/* Brilho hover */}
								<div className="absolute inset-0 bg-linear-to-br from-transparent via-(--color-accent)/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

								{/* Localização — visível só no hover (topo) */}
								<div className="absolute top-4 md:top-8 left-4 md:left-8 text-[11px] uppercase tracking-[2px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
									{project.location}
								</div>

								{/* Nome do projeto — sempre visível (baixo) */}
								<div
									className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-[11px] md:text-sm font-(--font-heading) uppercase text-white z-10 flex items-center gap-2 md:gap-4 pointer-events-none"
									style={{ letterSpacing: '3px' }}
								>
									<span className="w-5 md:w-8 h-px md:h-[2px] shrink-0 bg-white/50" />
									{project.title}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
