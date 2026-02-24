'use client'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex justify-between items-center mix-blend-difference">
			<div className="flex items-center gap-2">
				<span className="w-2 h-2 bg-white rounded-full" />
				<span className="font-(--font-heading) uppercase tracking-[0.4em] text-sm text-white">
					Embras
				</span>
			</div>

			<div className="hidden md:flex gap-12">
				{['Projetos', 'Produtos', 'Manifesto', 'Contato'].map(
					(item) => (
						<a
							key={item}
							href={`#${item.toLowerCase()}`}
							className="text-[10px] uppercase tracking-[0.3em] text-white hover:opacity-50 transition-opacity"
						>
							{item}
						</a>
					)
				)}
			</div>

			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex flex-col gap-1.5 cursor-pointer group"
			>
				<span className="w-6 h-[1px] bg-white transition-all group-hover:w-4" />
				<span className="w-6 h-[1px] bg-white transition-all group-hover:w-8" />
			</button>

			{/* Basic Mobile Menu Overlay Placeholder */}
			<div
				className={`fixed inset-0 bg-(--color-bg) z-[101] flex flex-col justify-center items-center gap-8 transition-all duration-700 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
			>
				<button
					onClick={() => setIsOpen(false)}
					className="absolute top-12 right-12 text-white uppercase text-xs tracking-widest"
				>
					Close
				</button>
				{['Projetos', 'Produtos', 'Manifesto', 'Contato'].map(
					(item) => (
						<a
							key={item}
							href="#"
							className="text-4xl font-(--font-heading) uppercase tracking-tighter text-white hover:text-(--color-muted)"
							onClick={() => setIsOpen(false)}
						>
							{item}
						</a>
					)
				)}
			</div>
		</nav>
	)
}
