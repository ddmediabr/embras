'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function MissionManifesto() {
	const container = useRef<HTMLElement>(null)
	const textRef = useRef<HTMLParagraphElement>(null)

	useGSAP(
		() => {
			if (!textRef.current) return

			gsap.fromTo(
				textRef.current,
				{
					opacity: 0.05,
					filter: 'blur(10px)',
					y: 20,
				},
				{
					opacity: 1,
					filter: 'blur(0px)',
					y: 0,
					duration: 1.5,
					scrollTrigger: {
						trigger: container.current,
						start: 'top 80%',
						end: 'bottom 20%',
						scrub: 1,
						toggleActions: 'play none none reverse',
					},
				}
			)
		},
		{ scope: container }
	)

	return (
		<section
			ref={container}
			className="py-64 px-8 flex justify-center items-center bg-(--color-bg)"
		>
			<p
				ref={textRef}
				className="text-3xl md:text-5xl max-w-5xl text-center leading-tight font-(--font-heading) uppercase tracking-wide text-(--color-accent)"
			>
				A luz não é apenas funcional. <br />
				<span className="text-(--color-muted)">
					Ela é a poesia que define o espaço e o tempo.
				</span>
			</p>
		</section>
	)
}
