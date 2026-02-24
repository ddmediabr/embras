'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement>(null)
	const glowRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const cursor = cursorRef.current
		const glow = glowRef.current
		if (!cursor || !glow) return

		const moveCursor = (e: MouseEvent) => {
			gsap.to(cursor, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.1,
				ease: 'power2.out',
			})
			gsap.to(glow, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.5,
				ease: 'power2.out',
			})
		}

		const handleMouseEnter = () => {
			gsap.to(cursor, {
				scale: 4,
				backgroundColor: 'white',
				mixBlendMode: 'difference',
				duration: 0.3,
			})
			gsap.to(glow, { scale: 2, opacity: 0.5, duration: 0.3 })
		}

		const handleMouseLeave = () => {
			gsap.to(cursor, {
				scale: 1,
				backgroundColor: 'rgba(255,255,255,0.8)',
				mixBlendMode: 'normal',
				duration: 0.3,
			})
			gsap.to(glow, { scale: 1, opacity: 0.2, duration: 0.3 })
		}

		window.addEventListener('mousemove', moveCursor)

		const interactiveElements =
			document.querySelectorAll('button, a, .group')
		interactiveElements.forEach((el) => {
			el.addEventListener('mouseenter', handleMouseEnter)
			el.addEventListener('mouseleave', handleMouseLeave)
		})

		return () => {
			window.removeEventListener('mousemove', moveCursor)
			interactiveElements.forEach((el) => {
				el.removeEventListener('mouseenter', handleMouseEnter)
				el.removeEventListener('mouseleave', handleMouseLeave)
			})
		}
	}, [])

	return (
		<>
			<div
				ref={cursorRef}
				className="fixed top-0 left-0 w-2 h-2 bg-white/80 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
			/>
			<div
				ref={glowRef}
				className="fixed top-0 left-0 w-12 h-12 bg-white opacity-20 blur-xl rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
			/>
		</>
	)
}
