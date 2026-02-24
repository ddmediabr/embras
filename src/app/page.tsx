import HomeHero from '@/components/sections/HomeHero'
import MissionManifesto from '@/components/sections/MissionManifesto'

export default function Home() {
	return (
		<main className="min-h-screen bg-(--color-bg)">
			<HomeHero />
			<MissionManifesto />

			{/* Footer Placeholder */}
			<footer className="py-20 px-8 border-t border-(--color-surface) text-center">
				<p className="text-(--color-muted) text-sm tracking-widest uppercase">
					&copy; 2024 Embras Premium Lighting. Todos os direitos
					reservados.
				</p>
			</footer>
		</main>
	)
}
