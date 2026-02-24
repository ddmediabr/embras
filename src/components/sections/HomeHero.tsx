import Image from 'next/image'

export default function HomeHero() {
	return (
		<section className="h-screen flex items-center justify-center relative overflow-hidden bg-(--color-bg)">
			<Image
				src="/images/hero.png"
				alt="Architectural Lighting Embras"
				fill
				priority
				className="object-cover opacity-60 mix-blend-lighten scale-105 animate-slow-zoom"
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-(--color-bg)/20 to-(--color-bg) z-10" />

			<div className="relative z-20 flex flex-col items-center">
				<span className="text-[10px] uppercase tracking-[0.8em] text-(--color-accent)/40 mb-8 animate-fade-in">
					Premium Architectural Lighting
				</span>
				<h1 className="text-6xl md:text-9xl font-(--font-heading) uppercase tracking-[0.2em] text-center text-(--color-accent) leading-[0.8]">
					Embras <br />
					<span className="text-(--color-muted) opacity-50">
						Lighting
					</span>
				</h1>
			</div>

			{/* Decorative vertical line */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-(--color-accent) to-transparent opacity-30 z-20" />
		</section>
	)
}
