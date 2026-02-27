'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export default function HomeHero() {
	const heroRef = useRef<HTMLElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (!mounted || !heroRef.current || !lineRef.current) return

			const tl = gsap.fromTo(
				lineRef.current,
				{ y: 0 },
				{
					y: 90, // Updated for 120px height - 30px indicator
					ease: 'none',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 0.5,
					},
				}
			)

			return () => {
				tl.kill()
				ScrollTrigger.getAll().forEach((t) => t.kill())
			}
		},
		{ scope: heroRef, dependencies: [mounted] }
	)

	if (!mounted) {
		return (
			<section className="h-screen w-full bg-black flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
			</section>
		)
	}

	return (
		<section
			ref={heroRef}
			className="h-screen w-full flex relative bg-black overflow-hidden"
		>
			{/* BG RADIAL GRADIENT */}
			<div
				className="absolute inset-0 overflow-hidden"
				style={{
					background:
						'radial-gradient(circle at 50% 45%, #84796a 0%, #5e5448 45%, #2e2923 100%)',
				}}
			/>

			{/* TEXTURE EFFECT (REPEATING RADIAL) - ENHANCED FOR VISIBILITY */}
			<div
				className="absolute inset-0 pointer-events-none opacity-[0.8] z-0 mix-blend-overlay"
				style={{
					backgroundImage: `
						repeating-radial-gradient(
							circle at 20% 30%,
							rgba(255,255,255,0.1) 0,
							rgba(255,255,255,0.1) 1px,
							transparent 1px,
							transparent 4px
						),
						repeating-radial-gradient(
							circle at 80% 70%,
							rgba(255,255,255,0.05) 0,
							rgba(255,255,255,0.05) 1px,
							transparent 1px,
							transparent 4px
						)
					`,
					backgroundSize: '100px 100px',
				}}
			/>

			{/* HEADER ABSOLUTE INSIDE HERO */}
			<header className="absolute top-0 left-0 w-full z-50">
				<div className="flex items-center justify-between px-8 md:px-24 py-8">
					<div className="flex items-center">
						<div className="w-[120px] h-8 relative">
							<Image
								src="/images/embras-logo-w.png"
								alt="Embras"
								fill
								className="object-contain"
							/>
						</div>
					</div>
					<nav className="hidden md:flex gap-10 items-center">
						{['Projetos', 'Produtos', 'Manifesto', 'Contato'].map(
							(item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-white/50 transition-colors"
								>
									{item}
								</a>
							)
						)}
					</nav>
					<button className="rounded-none border border-white px-8 py-3 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase tracking-[2px] text-[11px] font-semibold">
						Contato
					</button>
				</div>
			</header>

			{/* CONTENT HIERARCHY */}

			{/* Center H1 Text + Description */}
			<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mt-12 md:mt-0">
				<div
					className="flex flex-col items-start max-w-fit px-8 md:px-0"
					style={{ marginTop: '5vh' }}
				>
					<h1 className="text-[5vw] md:text-[8vw] font-(--font-heading) leading-none tracking-tight text-[#f2e6cf] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
						ILUMINAÇÃO <span className="text-white">PREMIUM</span>
					</h1>

					<div className="mt-8 flex flex-col items-start gap-8 max-w-sm pointer-events-auto">
						<p className="!text-white/80 font-sans text-sm md:text-base font-light leading-relaxed">
							Iluminação projetada para espaços onde cada detalhe
							importa. Soluções exclusivas para residências,
							estúdios e ambientes de alto padrão.
						</p>
						<button className="rounded-none border border-white px-8 py-4 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase tracking-[2px] text-[11px] font-semibold backdrop-blur-sm">
							Conheça nossas linhas
						</button>
					</div>
				</div>
			</div>

			{/* Chandelier Image Layer - Positioned over background, under text */}
			<div className="absolute right-[5%] md:right-[15%] top-[-5%] h-[85%] w-[50%] md:w-[40%] z-10 pointer-events-none">
				<Image
					src="/images/lustres-dourado.webp"
					alt="Chandeliers"
					fill
					priority
					className="object-contain object-top"
				/>
			</div>

			{/* RIGHT SCROLL INDICATOR - CENTERED VERTICALLY */}
			<div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-20">
				<div className="relative w-0.5 h-[120px] flex justify-center">
					{/* Dark background line (Track) */}
					<div className="absolute inset-0 bg-[#474747]" />

					{/* Light moving line (Indicator) - 2px width */}
					<div
						ref={lineRef}
						className="absolute top-0 w-0.5 h-[30px] bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
					/>
				</div>
			</div>

			{/* BOTTOM GRADIENT TEXT - EMBRAS */}
			<div
				className="absolute left-0 w-full pointer-events-none select-none z-10 flex items-end justify-center overflow-hidden"
				style={{
					bottom: 0,
					height: '20vw',
				}}
			>
				<h2
					className="text-[14vw] md:text-[14vw] font-(--font-heading) uppercase leading-none tracking-[0.05em] whitespace-nowrap text-[#F8F7F3]"
					style={{
						transform: 'translateY(18%)',
						WebkitMaskImage:
							'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.0) 75%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)',
						maskImage:
							'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.0) 75%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)',
					}}
				>
					EMBRAS
				</h2>
			</div>
		</section>
	)
}
