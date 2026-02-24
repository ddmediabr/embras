import HomeHero from '@/components/sections/HomeHero'
import MissionManifesto from '@/components/sections/MissionManifesto'
import ProductCarousel from '@/components/sections/ProductCarousel'
import SuccessCases from '@/components/sections/SuccessCases'
import WhoWeAre from '@/components/sections/WhoWeAre'
import Testimonials from '@/components/sections/Testimonials'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
	return (
		<main className="min-h-screen bg-(--color-bg)">
			<HomeHero />
			<ProductCarousel />
			<MissionManifesto />
			<SuccessCases />
			<WhoWeAre />
			<Testimonials />
			<ContactSection />

			{/* Final Minimal Footer */}
			<footer className="py-20 px-8 border-t border-(--color-surface) bg-(--color-bg)">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-2">
						<span className="w-1.5 h-1.5 bg-white rounded-full" />
						<span className="font-(--font-heading) uppercase tracking-[0.4em] text-[10px] text-white">
							Embras Lighting
						</span>
					</div>

					<p className="text-(--color-muted) text-[10px] tracking-[0.3em] uppercase">
						&copy; 2024 Embras. Built with precision and light.
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
			</footer>
		</main>
	)
}
