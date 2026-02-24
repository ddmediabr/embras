import HomeHero from '@/components/sections/HomeHero'
import MissionManifesto from '@/components/sections/MissionManifesto'
import ProductCarousel from '@/components/sections/ProductCarousel'
import SuccessCases from '@/components/sections/SuccessCases'

export default function Home() {
	return (
		<main className="min-h-screen bg-(--color-bg) selection:bg-(--color-accent) selection:text-(--color-bg)">
			<HomeHero />
			<ProductCarousel />
			<MissionManifesto />
			<SuccessCases />

			{/* Footer refined */}
			<footer className="py-40 px-8 border-t border-(--color-surface) text-center bg-(--color-bg)">
				<div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
					<h2 className="text-4xl md:text-6xl font-(--font-heading) uppercase tracking-tighter leading-none">
						Vamos iluminar <br /> seu próximo{' '}
						<span className="text-(--color-muted)">capítulo.</span>
					</h2>
					<button className="px-12 py-5 border border-(--color-accent) uppercase tracking-[0.5em] text-[10px] hover:bg-(--color-accent) hover:text-(--color-bg) transition-all duration-500 cursor-pointer">
						Solicitar Consultoria
					</button>

					<div className="mt-20 pt-12 border-t border-(--color-surface) w-full flex flex-col md:flex-row justify-between items-center gap-8">
						<p className="text-(--color-muted) text-[10px] tracking-[0.3em] uppercase">
							&copy; 2024 Embras Premium Lighting. Built with
							precision.
						</p>
						<div className="flex gap-8">
							{['Instagram', 'LinkedIn', 'Pinterest'].map(
								(social) => (
									<a
										key={social}
										href="#"
										className="text-(--color-muted) text-[10px] tracking-widest uppercase hover:text-(--color-accent) transition-colors"
									>
										{social}
									</a>
								)
							)}
						</div>
					</div>
				</div>
			</footer>
		</main>
	)
}
