'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const products = [
	{ id: 1, name: 'Luminária Arch 01', category: 'Modern' },
	{ id: 2, name: 'Luminária Arch 02', category: 'Industrial' },
	{ id: 3, name: 'Luminária Arch 03', category: 'Luxury' },
	{ id: 4, name: 'Luminária Arch 04', category: 'Minimal' },
]

export default function ProductCarousel() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!sectionRef.current || !triggerRef.current) return

			// The total width of the carousel is determined by the number of items
			// Since we have 4 items of 40vw (in desktop), we calculate the total scroll distance
			const pin = gsap.fromTo(
				sectionRef.current,
				{ translateX: 0 },
				{
					translateX: '-150vw', // Moves far enough to show all items
					ease: 'none',
					scrollTrigger: {
						trigger: triggerRef.current,
						start: 'top top',
						end: '+=2000',
						scrub: 1,
						pin: true,
						anticipatePin: 1,
					},
				}
			)
			return () => pin.kill()
		},
		{ scope: triggerRef }
	)

	return (
		<div ref={triggerRef} className="overflow-hidden bg-(--color-bg)">
			<div
				ref={sectionRef}
				className="h-screen flex items-center relative gap-[10vw] px-[10vw] w-[250vw] bg-(--color-surface)/30"
			>
				<div className="flex-shrink-0 w-[40vw]">
					<h2 className="text-4xl md:text-6xl font-(--font-heading) uppercase leading-none">
						Nossa <br /> Seleção <br />{' '}
						<span className="text-(--color-muted)">Premium</span>
					</h2>
				</div>

				{products.map((product) => (
					<div
						key={product.id}
						className="w-[80vw] md:w-[40vw] flex-shrink-0"
					>
						<span className="text-xs uppercase tracking-[0.3em] text-(--color-muted) mb-4 block italic">
							{product.category}
						</span>
						<div className="aspect-[3/4] bg-(--color-bg) border border-(--color-border) mb-8 relative group cursor-pointer overflow-hidden transition-all hover:border-(--color-accent)/30">
							<div className="absolute inset-0 bg-gradient-to-tr from-transparent to-(--color-accent)/5 opacity-0 group-hover:opacity-100 transition-opacity" />
							{/* Product Image Placeholder with light effect */}
							<div className="absolute inset-0 flex items-center justify-center opacity-20">
								<div className="w-1 h-32 bg-(--color-accent) blur-2xl" />
							</div>
						</div>
						<h3 className="text-2xl font-(--font-heading) uppercase text-(--color-accent) tracking-widest">
							{product.name}
						</h3>
					</div>
				))}
			</div>
		</div>
	)
}
