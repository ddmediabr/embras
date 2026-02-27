'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const products = [
	{
		id: 1,
		name: 'Luminária Arch 01',
		category: 'Modern',
		image: '/images/product-1.png',
	},
	{
		id: 2,
		name: 'Luminária Arch 02',
		category: 'Industrial',
		image: '/images/product-2.png',
	},
	{
		id: 3,
		name: 'Luminária Arch 03',
		category: 'Luxury',
		image: '/images/product-1.png',
	},
	{
		id: 4,
		name: 'Luminária Arch 04',
		category: 'Minimal',
		image: '/images/product-2.png',
	},
]

export default function HeroProductsWrapper() {
	const heroRef = useRef<HTMLElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const overlayRef = useRef<HTMLDivElement>(null)
	const embrasTextRef = useRef<HTMLHeadingElement>(null)

	const carouselTriggerRef = useRef<HTMLDivElement>(null)
	const carouselSectionRef = useRef<HTMLDivElement>(null)

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (
				!mounted ||
				!heroRef.current ||
				!lineRef.current ||
				!carouselTriggerRef.current ||
				!carouselSectionRef.current ||
				!overlayRef.current
			)
				return

			// 1. Hero local scroll animation (the line indicator)
			gsap.to(lineRef.current, {
				y: 90, // Updated for 120px height - 30px indicator
				ease: 'none',
				scrollTrigger: {
					trigger: heroRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: 0.5,
				},
			})

			// 2. Integration Transition: Darken Hero as Carousel comes from bottom
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0 },
				{
					opacity: 1, // Full black for deep contrast #070707
					ease: 'none',
					scrollTrigger: {
						trigger: carouselTriggerRef.current,
						start: 'top bottom', // When carousel enters screen
						end: 'top top', // When carousel reaches top (pins)
						scrub: true,
					},
				}
			)

			// Subtle parallax/blur on EMBRAS text during transition for continuity
			gsap.fromTo(
				embrasTextRef.current,
				{ opacity: 1, filter: 'blur(0px)', y: '18%' },
				{
					opacity: 0.3,
					filter: 'blur(4px)',
					y: '0%', // slightly move up to follow natural scroll
					ease: 'none',
					scrollTrigger: {
						trigger: carouselTriggerRef.current,
						start: 'top bottom',
						end: 'top top',
						scrub: true,
					},
				}
			)

			// 3. Carousel Horizontal Pin Animation
			gsap.fromTo(
				carouselSectionRef.current,
				{ translateX: 0 },
				{
					translateX: '-150vw',
					ease: 'none',
					scrollTrigger: {
						trigger: carouselTriggerRef.current,
						start: 'top top', // Wait until it's fully overlapping
						end: '+=2500', // Slower horizontal scroll
						scrub: 1,
						pin: true,
						anticipatePin: 1,
					},
				}
			)

			return () => {
				ScrollTrigger.getAll().forEach((t) => t.kill())
			}
		},
		{ dependencies: [mounted] }
	)

	if (!mounted) {
		return (
			<section className="h-screen w-full bg-black flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
			</section>
		)
	}

	return (
		<div className="relative w-full bg-black">
			{/* --- HERO SECTION (STICKY) --- */}
			<section
				ref={heroRef}
				className="h-screen w-full flex overflow-hidden sticky top-0 z-0"
			>
				{/* BG RADIAL GRADIENT */}
				<div
					className="absolute inset-0 overflow-hidden"
					style={{
						background:
							'radial-gradient(circle at 50% 45%, #84796a 0%, #5e5448 45%, #2e2923 100%)',
					}}
				/>

				{/* TEXTURE EFFECT (REPEATING RADIAL) */}
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
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 bg-white rounded-full" />
							<span className="font-(--font-heading) uppercase tracking-[0.4em] text-sm text-white">
								Embras
							</span>
						</div>
						<nav className="hidden md:flex gap-10 items-center">
							{[
								'Projetos',
								'Produtos',
								'Manifesto',
								'Contato',
							].map((item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-white/50 transition-colors"
								>
									{item}
								</a>
							))}
						</nav>
						<button className="rounded-none border border-white px-8 py-3 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase tracking-[2px] text-[11px] font-semibold">
							Contato
						</button>
					</div>
				</header>

				{/* CONTENT HIERARCHY */}
				<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mt-12 md:mt-0">
					<div
						className="flex flex-col items-start max-w-fit px-8 md:px-0"
						style={{ marginTop: '5vh' }}
					>
						<h1 className="text-[5vw] md:text-[8vw] font-(--font-heading) leading-none tracking-tight text-[#f2e6cf] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
							ILUMINAÇÃO{' '}
							<span className="text-white">PREMIUM</span>
						</h1>

						<div className="mt-8 flex flex-col items-start gap-8 max-w-sm pointer-events-auto">
							<p className="!text-white/80 font-sans text-sm md:text-base font-light leading-relaxed">
								Iluminação projetada para espaços onde cada
								detalhe importa. Soluções exclusivas para
								residências, estúdios e ambientes de alto
								padrão.
							</p>
							<button className="rounded-none border border-white px-8 py-4 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase tracking-[2px] text-[11px] font-semibold backdrop-blur-sm">
								Conheça nossas linhas
							</button>
						</div>
					</div>
				</div>

				{/* Chandelier Image Layer */}
				<div className="absolute right-[5%] md:right-[15%] top-[-5%] h-[85%] w-[50%] md:w-[40%] z-10 pointer-events-none">
					<Image
						src="/images/lustres-dourado.webp"
						alt="Chandeliers"
						fill
						priority
						className="object-contain object-top"
					/>
				</div>

				{/* RIGHT SCROLL INDICATOR */}
				<div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-20">
					<div className="relative w-0.5 h-[120px] flex justify-center">
						<div className="absolute inset-0 bg-[#474747]" />
						<div
							ref={lineRef}
							className="absolute top-0 w-0.5 h-[30px] bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
						/>
					</div>
				</div>

				{/* TRANSITION OVERLAY */}
				<div
					ref={overlayRef}
					className="absolute inset-0 bg-[#050505] z-30 pointer-events-none opacity-0"
				/>

				{/* BOTTOM GRADIENT TEXT - EMBRAS */}
				<div
					className="absolute left-0 w-full pointer-events-none select-none z-40 flex items-end justify-center overflow-hidden"
					style={{
						bottom: 0,
						height: '20vw',
					}}
				>
					<h2
						ref={embrasTextRef}
						className="text-[14vw] md:text-[14vw] font-(--font-heading) uppercase leading-none tracking-[0.05em] whitespace-nowrap text-[#F8F7F3]"
						style={{
							transform: 'translateY(18%)',
							WebkitMaskImage:
								'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.01) 75%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)',
							maskImage:
								'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.01) 75%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)',
						}}
					>
						EMBRAS
					</h2>
				</div>
			</section>

			{/* --- PRODUCT CAROUSEL SECTION --- */}
			<div
				ref={carouselTriggerRef}
				className="relative w-full z-10 overflow-hidden bg-transparent"
			>
				{/* Background is explicitly transparent so the dark Hero behind it serves as the scene */}
				<div
					ref={carouselSectionRef}
					className="h-screen flex items-center relative gap-[10vw] px-[10vw] w-[250vw] bg-transparent pt-24"
				>
					<div className="shrink-0 w-[40vw]">
						<h2 className="text-5xl md:text-7xl font-(--font-heading) uppercase leading-tight md:leading-[82px] text-white drop-shadow-md">
							Nossa <br /> Seleção <br />{' '}
							<span className="text-(--color-muted) opacity-80">
								Premium
							</span>
						</h2>
					</div>

					{products.map((product) => (
						<div
							key={product.id}
							className="w-[80vw] md:w-[40vw] shrink-0"
						>
							<span className="product-category mb-4 block">
								{product.category}
							</span>
							{/* Preserving 100% aesthetic: only changing height from aspect-3/4 to h-[50vh] as requested */}
							<div className="h-[50vh] w-full bg-(--color-bg) border border-(--color-border) mb-8 relative group cursor-pointer overflow-hidden transition-all hover:border-(--color-accent)/30">
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
								/>
								<div className="absolute inset-0 bg-linear-to-tr from-transparent to-(--color-accent)/5 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
							<h3 className="text-2xl font-(--font-heading) uppercase text-(--color-accent) tracking-widest leading-none">
								{product.name}
							</h3>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
