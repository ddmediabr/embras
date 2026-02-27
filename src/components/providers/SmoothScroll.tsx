'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'

export default function SmoothScroll({ children }: { children: ReactNode }) {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
		})

		// Conectar Lenis ao GSAP ScrollTrigger
		// Sem isso, ScrollTrigger lê o scroll nativo (0) enquanto Lenis
		// anima virtualmente — todos os trigger points ficam errados
		lenis.on('scroll', ScrollTrigger.update)

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		return () => {
			lenis.destroy()
		}
	}, [])

	return <>{children}</>
}
