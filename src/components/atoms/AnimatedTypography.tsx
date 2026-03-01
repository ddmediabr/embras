'use client'

import React, { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

// ==========================================================================
// Helper: Cria manualmente os inner wrappers para o efeito de masked reveal.
// Após o SplitText criar as divs de linha, envolvemos o conteúdo de cada
// linha em um inner-div que será o alvo da animação. A div exterior (a linha
// criada pelo SplitText) recebe overflow:hidden, formando a "parede".
// ==========================================================================
function createMaskedLines(el: HTMLElement): {
	split: InstanceType<typeof SplitText>
	inners: HTMLElement[]
} {
	const split = new SplitText(el, {
		type: 'lines',
		linesClass: 'split-line',
	})

	const inners: HTMLElement[] = []

	split.lines.forEach((lineEl: Element) => {
		const line = lineEl as HTMLElement
		// Cria inner wrapper e move todos os filhos pra dentro dele
		const inner = document.createElement('div')
		inner.style.display = 'block'
		inner.style.width = '100%'

		while (line.firstChild) {
			inner.appendChild(line.firstChild)
		}
		line.appendChild(inner)

		// Configura a linha externa como a "parede" overflow-hidden
		line.style.overflow = 'hidden'
		line.style.display = 'block'
		line.style.position = 'relative'

		inners.push(inner)
	})

	return { split, inners }
}

// ============================================================================
// 1. ANIMATED HEADING (H2)
// ============================================================================

export type Direction = 'left' | 'right' | 'up' | 'down'

export interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children: React.ReactNode
	direction?: Direction
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	delay?: number
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
	children,
	direction = 'left',
	as: Component = 'h2',
	className = '',
	delay = 0.5,
	...props
}) => {
	const containerRef = useRef<HTMLHeadingElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (!mounted || !containerRef.current) return

			const el = containerRef.current
			const { split, inners } = createMaskedLines(el)

			if (!inners.length) return

			let fromVars: gsap.TweenVars = {}
			switch (direction) {
				case 'left':
					fromVars = { xPercent: -150 }
					break
				case 'right':
					fromVars = { xPercent: 150 }
					break
				case 'up':
					fromVars = { yPercent: 150 }
					break
				case 'down':
					fromVars = { yPercent: -150 }
					break
			}

			gsap.fromTo(inners, fromVars, {
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none none',
				},
				xPercent: 0,
				yPercent: 0,
				duration: 1.2,
				delay: delay,
				ease: 'power4.out',
				stagger: 0.15,
			})

			return () => {
				split.revert()
			}
		},
		{ scope: containerRef, dependencies: [mounted] }
	)

	return (
		<Component ref={containerRef} className={className} {...props}>
			{children}
		</Component>
	)
}

// ============================================================================
// 2. ANIMATED PARAGRAPH
// ============================================================================

export interface AnimatedParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode
	delay?: number
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
	children,
	className = '',
	delay = 1.0,
	...props
}) => {
	const containerRef = useRef<HTMLParagraphElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (!mounted || !containerRef.current) return

			const el = containerRef.current
			const { split, inners } = createMaskedLines(el)

			if (!inners.length) return

			gsap.fromTo(
				inners,
				{ yPercent: -150 },
				{
					scrollTrigger: {
						trigger: el,
						start: 'top 85%',
						toggleActions: 'play none none none',
					},
					yPercent: 0,
					duration: 1,
					delay: delay,
					ease: 'power4.out',
					stagger: 0.05,
				}
			)

			return () => {
				split.revert()
			}
		},
		{ scope: containerRef, dependencies: [mounted] }
	)

	return (
		<p ref={containerRef} className={className} {...props}>
			{children}
		</p>
	)
}

// ============================================================================
// 3. ANIMATED PILL
// ============================================================================

export interface AnimatedPillProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

export const AnimatedPill: React.FC<AnimatedPillProps> = ({
	children,
	className = '',
	...props
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLSpanElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useGSAP(
		() => {
			if (
				!mounted ||
				!containerRef.current ||
				!textRef.current ||
				!lineRef.current
			)
				return

			gsap.set(containerRef.current, { visibility: 'visible' })

			// Puxa a cor original que foi computada pela classe CSS (evita setar cinza em locais diferentes da tela se houver variação de tema)
			const computedColor =
				gsap.getProperty(textRef.current, 'color') ||
				'rgba(255, 255, 255, 0.4)'

			const split = new SplitText(textRef.current, { type: 'chars' })

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 85%',
					toggleActions: 'play none none none',
				},
			})

			// Passo 1: Flash ordenado e isolado letra por letra (Tempo aumentado)
			tl.to(split.chars, {
				keyframes: [
					{ color: '#ffffff', duration: 0.15 },
					{ color: computedColor, duration: 0.45 },
				],
				stagger: 0.08,
				ease: 'power2.inOut',
			})

			// Passo 2: A linha começa da DIREITA para a ESQUERDA após a travessia das letras
			tl.fromTo(
				lineRef.current,
				{ xPercent: 102 },
				{
					xPercent: -105, // Passa dos 100% garantindo a completa oclusão do pixel na borda
					duration: 1.0,
					ease: 'power2.inOut',
				},
				'-=0.4'
			)

			return () => split.revert()
		},
		{ scope: containerRef, dependencies: [mounted] }
	)

	return (
		<div
			ref={containerRef}
			className={`inline-flex flex-col tracking-[0.4em] not-italic text-[14px] font-medium bg-transparent border-none p-0 items-center sm:items-start ${className}`}
			style={{ visibility: 'hidden' }}
			{...props}
		>
			<span ref={textRef} className="block relative">
				{children}
			</span>
			{/* Decorative Line delimitada para 40% com marginTop de 8px e altura de 1px simulando o ::after da classe .pill */}
			<div className="relative mt-[8px] h-px w-[40%] overflow-hidden bg-white/20">
				<div
					ref={lineRef}
					className="absolute inset-0 h-full w-full bg-white will-change-transform"
				/>
			</div>
		</div>
	)
}
