export default function HomeHero() {
	return (
		<section className="h-screen flex items-center justify-center relative overflow-hidden bg-(--color-bg)">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-(--color-bg) opacity-50 z-10" />

			<h1 className="text-6xl md:text-8xl font-(--font-heading) uppercase tracking-[0.2em] text-center z-20 text-(--color-accent)">
				Embras <br />
				<span className="text-(--color-muted)">Lighting</span>
			</h1>

			{/* Decorative vertical line */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-(--color-accent) to-transparent opacity-30 z-20" />
		</section>
	)
}
